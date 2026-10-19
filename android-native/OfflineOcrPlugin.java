package dj.cripen.monecole3a;
import android.graphics.Bitmap;import android.graphics.BitmapFactory;import android.util.Base64;
import com.getcapacitor.JSObject;import com.getcapacitor.Plugin;import com.getcapacitor.PluginCall;import com.getcapacitor.annotation.CapacitorPlugin;import com.getcapacitor.PluginMethod;
import com.google.mlkit.vision.common.InputImage;import com.google.mlkit.vision.text.TextRecognition;import com.google.mlkit.vision.text.latin.TextRecognizerOptions;
@CapacitorPlugin(name="OfflineOcr") public class OfflineOcrPlugin extends Plugin {
 @PluginMethod public void recognize(PluginCall call) {try {
 String b64=call.getString("base64");if(b64==null){call.reject("Image absente");return;}
 int comma=b64.indexOf(',');if(comma>=0)b64=b64.substring(comma+1);
 byte[] bytes=Base64.decode(b64,Base64.DEFAULT);Bitmap bmp=BitmapFactory.decodeByteArray(bytes,0,bytes.length);
 if(bmp==null){call.reject("Image invalide");return;}
 TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS).process(InputImage.fromBitmap(bmp,0)).addOnSuccessListener(result->{JSObject ret=new JSObject();ret.put("text",result.getText());call.resolve(ret);}).addOnFailureListener(e->call.reject("OCR impossible : "+e.getMessage()));
 }catch(Exception e){call.reject(e.getMessage());}}
}