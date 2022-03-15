const CONTEXT_MENU_TITLE = "生成模板代码";
const JJ_CONTEXT_MENU_ADD = "jj_flash_note_menu_add";
const NOTE_ACTION_CREATE = "jj_flash_note_action_create";

function showNoteDrawer() {
  let queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (tabs) => {
    if (tabs.length <= 0) {
      return;
    }

    const tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      {
        file: "./command.js",
      },
      (results) => {
        console.log(results);
        chrome.tabs.sendMessage(tab.id, {
          action: NOTE_ACTION_CREATE,
          data: results[0],
        });
      }
    );
  });
}

async function installContextMenu() {
  chrome.contextMenus.create({
    id: JJ_CONTEXT_MENU_ADD,
    title: CONTEXT_MENU_TITLE,
    type: "normal",
    contexts: ["page", "frame", "selection", "link"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === JJ_CONTEXT_MENU_ADD) {
      showNoteDrawer();
    }
  });
}

installContextMenu();
