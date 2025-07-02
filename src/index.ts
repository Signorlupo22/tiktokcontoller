import { TikTokLiveConnection, WebcastEvent } from 'tiktok-live-connector';
import keySender from 'node-key-sender';
import { exec } from 'child_process';
import path from 'path';

// Inserisci il tuo username TikTok (senza la @)
const tiktokUsername = '_chomas_dev';

const tiktok = new TikTokLiveConnection(tiktokUsername);

// Connetti alla live
tiktok.connect().then(() => {
  console.log(`✅ Connesso alla live di @${tiktokUsername}`);
}).catch(err => {
  console.error('❌ Errore di connessione:', err);
});

// Quando ricevi un regalo
tiktok.on(WebcastEvent.GIFT, (data: any) => {
  const coins = data.gift.diamondCount;
  const sender = data.uniqueId;

  console.log(`🎁 Regalo da ${sender} - ${coins} coin(s)`);

  if (coins >= 1 && coins < 3) {
    console.log('↩️ Ctrl+Z triggered!');
    keySender.sendCombination(['control', 'z']);
  } else if (coins >= 3 && coins < 5) {
    console.log('📝 Select All (Ctrl+A)');
    keySender.sendCombination(['control', 'a']);
  } else if (coins >= 5 && coins < 8) {
    console.log('❌ Chiudo editor (Ctrl+W)');
    keySender.sendCombination(['control', 'w']);
  } else if (coins >= 8 && coins < 12) {
    console.log('🔄 Refresh page (Ctrl+R)');
    keySender.sendCombination(['control', 'r']);
  } else if (coins >= 12 && coins < 15) {
    console.log('🔍 Find (Ctrl+F)');
    keySender.sendCombination(['control', 'f']);
  } else if (coins >= 15 && coins < 20) {
    console.log('💾 Save (Ctrl+S)');
    keySender.sendCombination(['control', 's']);
  } else if (coins >= 20 && coins < 25) {
    console.log('🖥️ Close tab (Ctrl+Shift+W)');
    keySender.sendCombination(['control', 'shift', 'w']);
  } else if (coins >= 25 && coins < 30) {
    console.log('🔄 Restart PC in 30 secondi');
    exec('shutdown -r -t 30'); // Windows restart
  } else if (coins >= 30) {
    console.log('💣 Spegnimento PC in 10 secondi');
    exec('shutdown -s -t 10'); // Windows - su macOS/Linux: 'shutdown -h +0.1'
  }
});


tiktok.on(WebcastEvent.CHAT, (data: any) => {
  console.log(data.comment);
  if(data.comment.includes('/cam1')){
    console.log('📹 Switching to camera 1');
    keySender.sendCombination(['control', 'alt', '1']);
  }
  if(data.comment.includes('/cam2')){
    console.log('📹 Switching to camera 2');
    keySender.sendCombination(['control', 'alt', '2']);
  }
  if(data.comment.includes('/cam3')){
    console.log('📹 Switching to camera 3');
    keySender.sendCombination(['control', 'alt', '3']);
  }
  if(data.comment.includes('/allert')){
    console.log('🚨 Alert');
    try {      
      const audioPath = path.join(__dirname, '../media/air.mp3');
      console.log(`🔊 Playing audio from: ${audioPath}`);
      
      // Try multiple methods to play audio
      const methods = [
        // Method 1: Using start command with default app
        `start "" "${audioPath}"`,
        // Method 2: Using PowerShell with Windows Media Player
        `powershell -c "& '${audioPath}'"`,
        // Method 3: Using rundll32 to play sound
        `rundll32 user32.dll,MessageBeep`
      ];
      
      let methodIndex = 0;
      
      const tryNextMethod = () => {
        if (methodIndex >= methods.length) {
          console.error('❌ All audio methods failed');
          return;
        }
        
        const command = methods[methodIndex];
        console.log(`🔄 Trying method ${methodIndex + 1}: ${command}`);
        
        exec(command, (err) => {
          if (err) {
            console.error(`❌ Method ${methodIndex + 1} failed:`, err.message);
            methodIndex++;
            tryNextMethod();
          } else {
            console.log('🔊 Alert sound played successfully');
          }
        });
      };
      
      tryNextMethod();
      
    } catch (error) {
      console.error('❌ Audio playback failed:', error);
    }
  }
});
