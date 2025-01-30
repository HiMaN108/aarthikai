"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {

    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if(scrollPosition > scrollThreshold){
                imageElement.classList.add("scrolled")
            }else{
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

  return <section className="pb-20 px-4">
    <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title"> 
        Aarthik: <br />Simplifying Your Money Matters
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Aarthik AI is a simple and easy to use personal finance manager. <br />
            It helps you keep track of your expenses and income, <br />
            so you can make better financial decisions.
        </p>
        <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
                <Button size='lg' className="px-8">
                    Get Started
                </Button>
            </Link>
            <Link href="https://www.youtube.com/watch?v=egS6fnZAdzk&t=2408s">
                <Button size='lg' variant='outline' className="px-8">
                    Watch Demo
                </Button>
            </Link>
        </div>
        
        <div className="hero-wrapper-image mt-5 md:mt-0"> 
            <div ref={imageRef} className="hero-image"> 
                <Image src='/banner.webp' 
                width={1280} 
                height={720}
                alt='banner dashboard' 
                className="rounded-lg shadow-2xl border mx-auto" 
                priority
                />
            </div>
        </div>

    </div>
    
    </section>;

};

export default HeroSection;