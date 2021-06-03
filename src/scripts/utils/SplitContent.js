import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

export default class SplitContent {
    constructor() {
        this.initEls()
        this.initEvents()
    }

    initEls() {
        this.$els = {
            texts: document.querySelectorAll('.js-split-text')
        }
    }

    initEvents() {
        if(this.$els.texts){
            this.splitText()
        }
    }

    splitText () {
        gsap.registerPlugin(SplitText)

        setTimeout(() => {
            this.$els.texts.forEach((text, index) => {
                this.$els.texts[index].setAttribute("id", "splitText-" + index)
                new SplitText("#splitText-" + index, { type: "words,chars" })
            })
        }, 10)
    }
}
