var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
/**
 * @name TextToSpeech
 * @description
 * Text to Speech plugin
 *
 * @usage
 * ```
 * import {TextToSpeech} from 'ionic-native';
 *
 * TextToSpeech.speak('Hello World')
 *   .then(() => console.log('Success'))
 *   .catch((reason: any) => console.log(reason));
 *
 * ```
 * @interfaces
 * TTSOptions
 */
export var TextToSpeech = (function () {
    function TextToSpeech() {
    }
    /**
     * This function speaks
     * @param options {string | TTSOptions} Text to speak or TTSOptions
     * @return {Promise<any>} Returns a promise that resolves when the speaking finishes
     */
    TextToSpeech.speak = function (options) {
        return;
    };
    TextToSpeech.stop = function () {
        return;
    };
    __decorate([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], TextToSpeech, "speak", null);
    TextToSpeech = __decorate([
        Plugin({
            pluginName: 'TextToSpeech',
            plugin: 'cordova-plugin-tts',
            pluginRef: 'TTS',
            repo: 'https://github.com/vilic/cordova-plugin-tts'
        })
    ], TextToSpeech);
    return TextToSpeech;
}());
//# sourceMappingURL=text-to-speech.js.map