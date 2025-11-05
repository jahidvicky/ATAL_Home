// src/routes/plpResolvers.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CAT, SUB } from "../constants/catalogIds";
import { goToPLP } from "./plpNavigate";

// Glasses
export function GlassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Eyeglasses", CAT.OUR_COLLECTION, SUB.EYEGLASSES);
    }, [navigate]);
    return null;
}

export function MensFramesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Men's Frames", CAT.SHOP_BY_CATEGORY, SUB.MENS_FRAMES);
    }, [navigate]);
    return null;
}

export function WomensFramesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Women's Frames", CAT.SHOP_BY_CATEGORY, SUB.WOMENS_FRAMES);
    }, [navigate]);
    return null;
}

export function KidsGlassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Kids Glasses", CAT.OUR_COLLECTION, SUB.KIDS_GLASSES);
    }, [navigate]);
    return null;
}

// Shapes
export function AviatorResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Aviator Frame", CAT.FRAME_SHAPE, SUB.AVIATOR);
    }, [navigate]);
    return null;
}

export function RoundResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Round Frame", CAT.FRAME_SHAPE, SUB.ROUND);
    }, [navigate]);
    return null;
}

export function RectangleResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Rectangle Frame", CAT.FRAME_SHAPE, SUB.RECTANGLE);
    }, [navigate]);
    return null;
}

export function CatEyeResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Cat-Eye Frame", CAT.FRAME_SHAPE, SUB.CAT_EYE);
    }, [navigate]);
    return null;
}

export function OvalResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Oval Frame", CAT.FRAME_SHAPE, SUB.OVAL);
    }, [navigate]);
    return null;
}

export function SquareResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Square Frame", CAT.FRAME_SHAPE, SUB.SQUARE);
    }, [navigate]);
    return null;
}

// Collections
export function EyeglassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Eyeglasses", CAT.OUR_COLLECTION, SUB.EYEGLASSES);
    }, [navigate]);
    return null;
}

export function SportsGlassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Sports Glasses", CAT.OUR_COLLECTION, SUB.SPORTS_GLASSES);
    }, [navigate]);
    return null;
}

export function BlueGlassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Blue Glasses", CAT.OUR_COLLECTION, SUB.BLUE_GLASSES);
    }, [navigate]);
    return null;
}

// Sunglasses
export function SunglassesResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Sunglasses", CAT.OUR_COLLECTION, SUB.SUNGLASSES);
    }, [navigate]);
    return null;
}

// Contacts
export function ContactsResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Contact Lenses", CAT.SHOP_BY_CATEGORY, SUB.CONTACT_LENSES);
    }, [navigate]);
    return null;
}

// Trending / Best Seller
export function TrendingResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Trending", CAT.CURRENTLY_TRENDING, SUB.TRENDING);
    }, [navigate]);
    return null;
}

export function BestSellerResolver() {
    const navigate = useNavigate();
    useEffect(() => {
        goToPLP(navigate, "Best Seller", CAT.SELLER, SUB.BEST_SELLER);
    }, [navigate]);
    return null;
}

