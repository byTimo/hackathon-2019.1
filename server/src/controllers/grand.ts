import {Request, Response} from "express";
import {db} from "../db";

export async function selectGrands(req: Request, res: Response) {
    let grads = await db.grand.select();
    grads = await Promise.all(grads.map(async (x: any) => {
        const bars = await db.bars.select(x.bars)
        return {...x, bars: bars}
    }))
    res.send(grads);
}