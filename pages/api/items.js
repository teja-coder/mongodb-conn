import { MongoClient } from 'mongodb';

export default async function handler(req, res) {

    if (req.method == 'GET') {

        const client = new MongoClient(process.env.MONGODB_URI);

        try{

            await client.connect();
            const db = client.db('ResourceMonitor');
            const collection = db.collection('metrics');
            const data = await collection.find({'id': 'Novasol521'}).toArray();

            res.status(200).json({'data': data});

        } catch (err) {
            console.log(err)
            res.status(500).json({'message': err})
        } finally {
            await client.close();
        }

    } else {
        res.status(405).json({'message': 'Method not allowed'})
    }

}