const BRIDGE_DATA = {
  "languages": [
    {
      "id": "rar",
      "label": "Rarámuri",
      "lang": "tar"
    },
    {
      "id": "es",
      "label": "Español",
      "lang": "es-MX"
    },
    {
      "id": "en",
      "label": "Inglés",
      "lang": "en-US"
    },
    {
      "id": "fr",
      "label": "Francés",
      "lang": "fr-FR"
    },
    {
      "id": "it",
      "label": "Italiano",
      "lang": "it-IT"
    },
    {
      "id": "de",
      "label": "Alemán",
      "lang": "de-DE"
    },
    {
      "id": "zh",
      "label": "Mandarín",
      "lang": "zh-CN"
    }
  ],
  "scenes": [
    {
      "id": "agua",
      "spanish": "Agua",
      "image": "cup.png",
      "alt": "Una persona adulta muestra una taza a un niño pequeño.",
      "tip": "Escuchen juntos. Después, señala el agua en una taza de casa.",
      "words": {
        "rar": {
          "text": "baʔˈwí",
          "audio": "water-choguita.wav",
          "sourceUrl": "https://langsci-press.org/catalog/book/324",
          "note": "Transcripción de Choguita. Caballero (2022), p. 202, ejemplo (2e). La palabra significa agua; la taza de la imagen sirve para compartirla."
        },
        "es": {
          "text": "Agua",
          "audio": "voice-es-agua.mp3"
        },
        "en": {
          "text": "Water",
          "audio": "voice-en-water.mp3"
        },
        "fr": {
          "text": "Eau",
          "audio": "voice-fr-eau.mp3"
        },
        "it": {
          "text": "Acqua",
          "audio": "voice-it-acqua.mp3"
        },
        "de": {
          "text": "Wasser",
          "audio": "voice-de-wasser.mp3"
        },
        "zh": {
          "text": "水",
          "audio": "voice-zh-shui.mp3",
          "romanization": "shuǐ"
        }
      }
    },
    {
      "id": "saludar",
      "spanish": "Hola",
      "image": "greeting.png",
      "alt": "Una persona adulta y un niño pequeño se saludan con la mano.",
      "tip": "Miren juntos la imagen y saluda con un gesto.",
      "words": {
        "rar": {
          "text": "ˈkuíra (ba)",
          "audio": null,
          "sourceUrl": "https://langsci-press.org/catalog/book/324",
          "note": "Transcripción de Choguita. Caballero (2022), p. 387, ejemplo (41b). La fuente presenta ba como una parte opcional del saludo."
        },
        "es": {
          "text": "Hola",
          "audio": "voice-es-hola.mp3"
        },
        "en": {
          "text": "Hello",
          "audio": "voice-en-hello.mp3"
        },
        "fr": {
          "text": "Bonjour",
          "audio": "voice-fr-bonjour.mp3"
        },
        "it": {
          "text": "Ciao",
          "audio": null,
          "sourceUrl": "https://www.treccani.it/vocabolario/ciao/",
          "note": "Saludo informal italiano, también usado al despedirse."
        },
        "de": {
          "text": "Hallo",
          "audio": "voice-de-hallo.mp3"
        },
        "zh": {
          "text": "你好",
          "audio": null,
          "romanization": "nǐ hǎo",
          "sourceUrl": "https://www.mdbg.net/chinese/dictionary?page=worddict&wdqb=%E4%BD%A0%E5%A5%BD&wdrst=0"
        }
      }
    },
    {
      "id": "jugar",
      "spanish": "Pelota",
      "image": "play-ball.png",
      "alt": "Una persona adulta hace rodar una pelota hacia un niño pequeño.",
      "tip": "Busquen una pelota y háganla rodar juntos.",
      "words": {
        "rar": {
          "text": "peˈlôta",
          "audio": null,
          "sourceUrl": "https://langsci-press.org/catalog/book/324",
          "note": "Transcripción de Choguita. Caballero (2022), p. 608, ejemplo (7b). Palabra de origen español documentada en esta variedad."
        },
        "es": {
          "text": "Pelota",
          "audio": "voice-es-pelota.mp3"
        },
        "en": {
          "text": "Ball",
          "audio": "voice-en-ball.mp3"
        },
        "fr": {
          "text": "Ballon",
          "audio": null,
          "sourceUrl": "https://www.dictionnaire-academie.fr/article/A9B0240",
          "note": "Aquí se refiere a una pelota grande e inflada, como la de la imagen."
        },
        "it": {
          "text": "Palla",
          "audio": null,
          "sourceUrl": "https://www.treccani.it/vocabolario/palla1/"
        },
        "de": {
          "text": "Ball",
          "audio": "voice-de-ball.mp3"
        },
        "zh": {
          "text": "球",
          "audio": null,
          "romanization": "qiú",
          "sourceUrl": "https://www.mdbg.net/chinese/dictionary?page=worddict&wdqb=%E7%90%83&wdrst=0"
        }
      }
    }
  ],
  "audioCredits": {
    "water-choguita.wav": {
      "author": "Jesusita Loya Guerra; Gabriela Caballero (2022)",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "sourceUrl": "https://zenodo.org/records/7268366",
      "word": "baʔˈwí",
      "language": "rar",
      "changes": "Grabación original, sin modificaciones. Archivo co1234[06_044-06_053].wav, p. 202, ejemplo (2e)."
    },
    "voice-en-water.mp3": {
      "author": "Dvortygirl",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:En-us-water.ogg",
      "word": "water",
      "language": "en",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "a17bac580c590fd363d93fa9a3ade98f22619c0f30bc2c3cc44f23f959edeb20"
    },
    "voice-en-hello.mp3": {
      "author": "Dvortygirl",
      "license": "Public domain",
      "licenseUrl": "https://commons.wikimedia.org/wiki/File:En-us-hello.ogg#Licensing",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:En-us-hello.ogg",
      "word": "hello",
      "language": "en",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "fa803c4b9e0363d088074f316acbbbde43f2089337826f4c7dd00b2cce9dca6a"
    },
    "voice-en-ball.mp3": {
      "author": "Dvortygirl",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:En-us-ball.ogg",
      "word": "ball",
      "language": "en",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "4714c54ad8d0b3bd9b8eb4d8735d6ed1c7646a20c1ee6fbc4f42524f7093ab89"
    },
    "voice-es-agua.mp3": {
      "author": "ProtoplasmaKid",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Es-agua.oga",
      "word": "agua",
      "language": "es",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "bf5cab0720312dce3ba29272847027c6b3fa8961a677b2e43756d7f3fbde0d11"
    },
    "voice-es-hola.mp3": {
      "author": "Speaker: CaroEspinoza Recorder: CaroEspinoza",
      "license": "CC0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:LL-Q1321_(spa)-CaroEspinoza-HOLA.wav",
      "word": "hola",
      "language": "es",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "9dca5da19fccaed46f417d1d4158adfdc6e4e9f92279b5d42f2ef4e4b85f3319"
    },
    "voice-es-pelota.mp3": {
      "author": "Speaker: Marreromarco Recorder: Marreromarco",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:LL-Q1321_(spa)-Marreromarco-pelota.wav",
      "word": "pelota",
      "language": "es",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "3457b154d4aa78b4dceb1a9c99448a1c95f7d9a15666efbd26653f11a6a8d0e8"
    },
    "voice-fr-eau.mp3": {
      "author": "Speaker: Guilhelma Recorder: Guilhelma",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:LL-Guilhelma-fr-eau.wav",
      "word": "eau",
      "language": "fr",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "110d04701d6f799ff8977ce212ad664b1ee235c557ad6f67ec6db0ebe9e301d0"
    },
    "voice-fr-bonjour.mp3": {
      "author": "Vion Nicolas",
      "license": "CC BY 2.0 fr",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/fr/deed.en",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Fr-bonjour.ogg",
      "word": "bonjour",
      "language": "fr",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "713fb98f007f36d7b12a44c59480cf7396873d0b938fd4c35190028d4e882b63"
    },
    "voice-it-acqua.mp3": {
      "author": "Accurimbono",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:It-acqua.ogg",
      "word": "acqua",
      "language": "it",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "d65cfca633e8f8807ea78c8eeab1046478ef200cd9fb75b93552d25d33e2a633"
    },
    "voice-de-wasser.mp3": {
      "author": "Tosca",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ADe-Wasser.ogg",
      "word": "Wasser",
      "language": "de",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "ecadef3099b8d4d596a9d5d2066adfd1aceb725771c49c0a7f40a33bc324542f"
    },
    "voice-de-hallo.mp3": {
      "author": "Jeuwre",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ADe-hallo.ogg",
      "word": "hallo",
      "language": "de",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "a2d7cd28dac53d9c369635f8494f6094c66f69609dd681833cd4f0207603ade3"
    },
    "voice-de-ball.mp3": {
      "author": "Pill",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ADe-Ball.ogg",
      "word": "Ball",
      "language": "de",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "8ae102f05a2afa862883a4dd6d7da529e4f3996fdefd141ec458d1f051847cac"
    },
    "voice-zh-shui.mp3": {
      "author": "Wei Gao, Vion Nicolas",
      "license": "CC BY 2.0 France",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0/fr/",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AZh-shu%C7%90.ogg",
      "word": "水",
      "language": "zh",
      "changes": "MP3 proporcionado por Wikimedia Commons; sin cambios adicionales.",
      "sha256": "15f5250658822f0fd234550f96751ac581a50376f9fc0b4b95aa20cfdce684bd"
    }
  }
};
