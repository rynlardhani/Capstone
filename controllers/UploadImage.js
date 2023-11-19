import multer from "multer";
import { Storage } from '@google-cloud/storage';
import Users from "../models/UserModels.js";

const storage = new Storage({
    projectId: 'capstone-trackmeals-405419',
    keyFilename: './config/key.json',
});

export default storage;

export const multerImage = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const bucket = storage.bucket("profile-image-user-trackmeals");

export const uploadImage = async (req, res) => {
    try {
        if (req.file) {
            // Generate a unique filename for the uploaded file
            const uniqueFilename = `${Date.now()}`;

            console.log('file found trying to upload');
            const blob = bucket.file(uniqueFilename);
            const blobStream = blob.createWriteStream({});

            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                const userId = req.params.id;

                try {
                    // Use await to wait for the update operation to complete
                    await Users.update(
                        {
                            profilePic: publicUrl,
                        },
                        {
                            where: {
                                userId: userId,
                            },
                        }
                    );
                    res.status(200).send({
                        message: 'Image uploaded.',
                        data: publicUrl,
                    });
                } catch (updateError) {
                    console.error('Error updating profileImage:', updateError);
                    res.status(500).send({
                        error: 'Internal Server Error',
                    });
                }
            });

            blobStream.end(req.file.buffer);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({
            error: 'Internal Server Error',
        });
    }
};
