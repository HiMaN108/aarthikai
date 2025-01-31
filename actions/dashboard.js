"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };

    if(obj.amount){
        serialized.balance = obj.balance.toNumber();
    }
}

export async function createAccount(data) {

    try {
        const { userId } = await auth();

        if(!userId) throw new Error("You must be logged in to perform this action");

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        });;
        
        if(!user) throw new Error("User not found");

        //convert the balace to float before saving it to the database

        const balanceFloat = parseFloat(data.balance);

        if(isNaN(balanceFloat)) throw new Error("Invalid balance");

        // checking if thisis the user's first account
        const existingAccounts = await db.account.findMany({
            where: {
                userId: user.id
            }
        });

        const shouldBeDefault = 
            existingAccounts.length === 0 ? true : data.isDefault;


        // if this account should be defaults, unset other defaults accounts

        if(shouldBeDefault){
            await db.account.updateMany({
                where: {
                    userId: user.id,
                    isDefault: true
                },
                data : {
                    isDefault: false
                }
            });
        }

        const account = await db.account.create({
            data : {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault
            }
        });


        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");

        return { success : true , data : serializedAccount}
    } catch (error) {
            throw new Error(error.message);    
    }
    
}