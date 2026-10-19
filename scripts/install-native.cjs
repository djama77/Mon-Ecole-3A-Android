const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'../android/app/src/main/java/dj/cripen/monecole3a');
fs.mkdirSync(base,{recursive:true});
fs.copyFileSync(path.join(__dirname,'../android-native/OfflineOcrPlugin.java'),path.join(base,'OfflineOcrPlugin.java'));
const main=path.join(base,'MainActivity.java');
fs.writeFileSync(main,`package dj.cripen.monecole3a;
import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
public class MainActivity extends BridgeActivity { @Override public void onCreate(Bundle state) { registerPlugin(OfflineOcrPlugin.class); super.onCreate(state); } }
`);
const gradle=path.join(__dirname,'../android/app/build.gradle');
let s=fs.readFileSync(gradle,'utf8');
if(!s.includes('com.google.mlkit:text-recognition:16.0.1')) s+="\ndependencies { implementation 'com.google.mlkit:text-recognition:16.0.1' }\n";
fs.writeFileSync(gradle,s);
console.log('Plugin OCR local installé');