import express from "express";
import validate from "../MiddleWare/valid";
import { parkS, parkSchemaType } from "../ZodS/parkzod";

const rout = express.Router();
const parks: parkSchemaType[] = []

rout.get('/', (req, res) => {
    return res.json(parks)
});

rout.post('/', validate(parkS), (req, res) => {
    const Park = req.body as parkSchemaType;
    parks.push(Park);
    return res.status(200).json({
        message: 'Parking added succsessfully'
    })
})

rout.put('/:id', validate(parkS), (req, res) => {

    const update= req.body as parkSchemaType;

    const {id} = req.params;
    
    for (let i=0; i<parks.length; i++){
        if(parks[i].id === id){
            parks[i] = update;
            return res.status(200).json({
                message: 'Parking updated succsessfully '
            })
        } else {
            return res.status(404).json({
                message: 'Park is not found'
            })
        }

    }
    
})

rout.delete('/:id', (req, res) => {

    const {id} = req.params;

    for (let i=0; i<parks.length; i++){
        if(parks[i].id === id){

            parks.splice(i, 1);
            return res.status(200).json({
                message: 'Parking has been  deleted succsessfully '
            })
        } else {
            return res.status(404).json({
                message: 'Park is not found :)'
            })
        }
    } 
})

export default rout;