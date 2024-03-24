import { attachPopup, PopAction, attachDialog, attachMenu } from "dialog-system";

const startMenuAction: PopAction = { menu: {
  items: [
    { label: "Test", action: {
      layout: [{
          name: "main-dialog",
          position: [50, 200],
          positionFromBottom: true,  
        }, {
          name: "test-menu",
          position: [400, 360],
          size: [0, 150],
          positionFromBottom: true,
          positionFromRight: true,  
        }, {
          name: "side-popup",
          position: [100, 100],
          size: [300, 200],  
      }],
      dialog: {
        layout: "main-dialog",
        messages: [
          "Hello there.",
          {
            text: "How are you?",
            action: { menu: {
              layout: "test-menu",
              maxRows: 3,
              items: [
                {
                  label: "I don't know",
                  behavior: "NONE",
                  action: [
                    { dialog: {
                      layout: "side-popup",
                      messages: [
                        "You should know!",
                      ],
                    }},
                  ],
                },
                {
                  label: "good",
                  behavior: "CLOSE_ON_SELECT",
                  action: { 
                    dialog: {
                      layout: "main-dialog",
                      messages: [
                        "That's nice to know!",
                      ],
                    },
                  },
                },
                {
                  label: "bad",
                  behavior: "CLOSE_AFTER_SELECT",
                  action: [
                    { dialog: {
                      layout: "side-popup",
                      messages: [
                        "Get better!",
                      ],
                    }},
                  ],
                },
                "----",
                {
                  behavior: "CLOSE_ON_SELECT",
                  label: "bye",
                },
              ],
            }},
          },
          "Good bye!",
        ],
      }, 
    }, behavior: "HIDE_ON_SELECT" },
    { label: "Exit", behavior: "CLOSE_ON_SELECT" },
  ],
} };

export { attachPopup, startMenuAction, attachDialog, attachMenu };
