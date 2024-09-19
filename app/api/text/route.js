import { connectMongoDB } from "../../lib/mongodb";
import Text from "../../models/text";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '../../models/user';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongoDB();
        const textData = await req.json();

        const { id, text, title } = textData;
        let savedText;

        if (id) {
            const user = await User.findOne({ email: session.user.email });
            const existingText = await Text.findOne({ _id: id, user: user._id });
            
            if (!existingText) {
                return NextResponse.json({ message: "Text not found or unauthorized access" }, { status: 404 });
            }
            
            savedText = await Text.findByIdAndUpdate(id, { text, title }, { new: true });
        } else {
            const user = await User.findOne({ email: session.user.email });
            savedText = await Text.create({ text, title, user });
        }

        return NextResponse.json({ data: { id: savedText._id }, message: "Text created/updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error during user creation/update:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongoDB();

        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        const user = await User.findOne({ email: session.user.email });

        if (id === 'all') {
            const texts = await Text.find({ user: user._id, isVisible: true });
            return NextResponse.json(texts, { status: 200 });
        } else {
            const text = await Text.findOne({ _id: id, user: user._id, isVisible: true });

            if (!text) {
                return NextResponse.json({ message: "Text not found or unauthorized access" }, { status: 404 });
            }

            return NextResponse.json(text, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching text(s):", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongoDB();

        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        const user = await User.findOne({ email: session.user.email });
        const text = await Text.findOne({ _id: id, user: user._id });

        if (!text) {
            return NextResponse.json({ message: "Text not found or unauthorized access" }, { status: 404 });
        }

        text.isVisible = false;
        await text.save();

        return NextResponse.json({ message: "Text hidden successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error hiding text:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
