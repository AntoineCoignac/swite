import { connectMongoDB } from "../../../../lib/mongodb";
import Text from "../../../../models/text";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import User from '../../../../models/user';
import { Mistral } from '@mistralai/mistralai';

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongoDB();

        const { id } = params;
        const user = await User.findOne({ email: session.user.email });
        const text = await Text.findOne({ _id: id, user: user._id, isVisible: true });

        if (!text) {
            return NextResponse.json({ message: "Text not found or unauthorized access" }, { status: 404 });
        }

        const apiKey = process.env.MISTRAL_API_KEY;
        const client = new Mistral({ apiKey: apiKey });

        const chatResponse = await client.chat.complete({
            model: 'mistral-tiny',
            messages: [{ role: 'user', content: `Fais un résumé du texte qui va t'être donné après le "Le texte :". Tu devras le rédiger sous forme de notes de cours avec des tirets (je veux uniquement le résumé ne rajoute rien ni avant ni après). Tu devras mettre en avant toutes les informations importantes qui sont indiquées dans le texte afin qu'à partir de ce réumé on puisse avoir toutes les informations dans le cas ou si je révise uniquement ce résumé je puisse réussir mon examen. Attention à ne pas répéter la même idée dans plusieurs tirets. N'écris rien qui n'aurait aucun sens selon toi et qui n'aurait aucun rapport avec le sujet du cours. Le texte : ${text.text}` }],
            temperature: 0.3,
        });

        const summary = chatResponse.choices[0].message.content;

        const updatedText = await Text.findByIdAndUpdate(
            id,
            { $set: { summary: summary } },
            { new: true, runValidators: true }
        );

        if (!updatedText) {
            return NextResponse.json({ message: "Failed to update text" }, { status: 500 });
        }

        return NextResponse.json({ summary: updatedText.summary }, { status: 200 });
    } catch (error) {
        console.error("Error generating summary:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}