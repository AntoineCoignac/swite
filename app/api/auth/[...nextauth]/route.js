import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log(user, account);
            
            if (account.provider === "google") {
                const { email, name, image } = user;
                try {
                    await fetch("/api/user", {
                        method: "POST",
                        body: JSON.stringify({ email, name, image }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        return user;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            return user;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PATCH };