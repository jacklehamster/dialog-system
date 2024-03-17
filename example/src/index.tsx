import { PopActionModel } from "dialog-system";
import { attachPopup, MenuItemBehavior } from "dialog-system";

const openTestDialogAction: PopActionModel = {
  layout: [{
    name: "main-dialog",
    position: [50, 200],
    positionFromBottom: true,  
  }, {
    name: "test-menu",
    position: [400, 360],
    size: [undefined, 150],
    positionFromBottom: true,
    positionFromRight: true,  
  }, {
    name: "layout-popup",
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
              behavior: MenuItemBehavior.NONE,
              action: [
                { dialog: {
                  layout: "layout-popup",
                  messages: [
                    "You should know!",
                  ],
                }},
              ],
            },
            {
              label: "good",
              behavior: MenuItemBehavior.CLOSE_ON_SELECT,
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
              behavior: MenuItemBehavior.CLOSE_AFTER_SELECT,
              action: [
                { dialog: {
                  layout: {
                    position: [100, 100],
                    size: [300, 200],  
                  },
                  messages: [
                    "Get better!",
                  ],
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
      "Good bye!",
    ]
  },
}; 

export { attachPopup, MenuItemBehavior, openTestDialogAction };
