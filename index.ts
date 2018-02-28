
import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// Cloud Vision
import * as vision from '@google-cloud/vision';
import { get } from 'https';
import { userInfo } from 'os';
import { user } from 'firebase-functions/lib/providers/auth';

const visionClient =  new vision.ImageAnnotatorClient();
const bucketName = 'puta666.appspot.com';

export const puta666 = functions.storage.bucket(bucketName).object().onChange( async event => {

   if (event.data.resourceState == 'not_exists') {
    console.log('DELETANDO IMAGEM, NÃO FAZ NADA');
   return false;
}

    const object = event.data; 
    const filePath = object.name; 
    const bucket = `gs://${bucketName}/${filePath}`; 
    const fileName = filePath.split('/').pop(); 

    const docRef  = admin.firestore().collection('livros').doc(fileName);

    const textRequest = await visionClient.documentTextDetection(bucket);
    const fullText = textRequest[0].textAnnotations[0]
    const text =  fullText ? fullText.description : null
    
    const data = { text, docRef}
      
    return docRef.set(data) 

});

