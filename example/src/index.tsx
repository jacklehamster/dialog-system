import { PopActionModel } from "dialog-system";
import { attachPopup, MenuItemBehavior } from "dialog-system";

const openTestDialogAction: PopActionModel = { dialog: {
  layout: {
    uid: "main-dialog",
    position: [50, 200],
    positionFromBottom: true,  
  },
  conversation: {
    messages: [
      { text: "Hello there." },
      {
        text: "How are you?",
        action: { menu: {
          layout: {
            position: [400, 360],
            size: [undefined, 150],
            positionFromBottom: true,
            positionFromRight: true,  
          },
          maxRows: 3,
          items: [
            {
              label: "I don't know",
              behavior: MenuItemBehavior.NONE,
              action: [
                { dialog: {
                  layout: {
                    position: [100, 100],
                    size: [300, 200],  
                  },
                  conversation: {
                    messages: [
                      { text: "You should know!" },
                    ],
                  },
                }},
              ],
            },
            {
              label: "good",
              behavior: MenuItemBehavior.CLOSE_ON_SELECT,
              action: { 
                dialog: {
                  layout: {
                    uid: "main-dialog",
                    position: [50, 200],
                    positionFromBottom: true,  
                  },
                  conversation: {
                    messages: [
                      { text: "That's nice to know!" },
                    ],
                  },
                },
              },
            },
            {
              label: "bad",
              behavior: MenuItemBehavior.CLOSE_AFTER_SELECT,
              action: [
                { dialog: {
                  layout: {
                    position: [100, 100],
                    size: [300, 200],  
                  },
                  conversation: {
                    messages: [
                      { text: "Get better!" },
                    ],
                  },
                }},
              ],
            },
            {
              label: "----",
            },
            {
              behavior: MenuItemBehavior.CLOSE_ON_SELECT,
              label: "bye",
            },
          ],
        }},
      },
      { text: "Good bye!" },
    ]
  },
} }; 

export { attachPopup, MenuItemBehavior, openTestDialogAction };
