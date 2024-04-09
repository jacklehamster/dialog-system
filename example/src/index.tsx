// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { openMenu, KeyboardControl } from "dialog-system";

export function startDialog() {
  const { detach, popupControl } = openMenu({
    layouts: [{
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
  menu: {
    items: [
      { label: "Test",
        dialog: {
          layout: {
            name: "main-dialog",
            position: [50, 200],
            positionFromBottom: true,
          },
          messages: [
            "Hello there.",
            {
              text: "How are you?",
              menu: {
                layout: "test-menu",
                items: [
                  {
                    label: "I don't know",
                    dialog: {
                      layout: "side-popup",
                      messages: [
                        "You should know!",
                      ],
                    }
                  },
                  {
                    label: "good",
                    hideOnSelect: true,
                    back: true,
                    dialog: {
                      layout: "main-dialog",
                      messages: [
                        "That's nice to know!",
                      ],
                    },
                  },
                  {
                    label: "bad",
                    back: true,
                    dialog: {
                      layout: "side-popup",
                      messages: [
                        "Get better!",
                      ],
                    }
                  },
                  "----",
                  {
                    back: true,
                    label: "bye",
                  },
                ],
              },
            },
            "Good bye!",
          ],        
        },
      }
    ]
  } });
  const kb = new KeyboardControl(popupControl);
  return { detach, popupControl };
}
