const employees = [
  {
    name: "Jason F.",
    position: "Chief Executive Officer",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Amy F.",
    position: "[REDACTED]",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Jane D.",
    position: "[REDACTED]",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "KJ J.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Zach B.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Randy J.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Alyssa F.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Alex P.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Taryn W.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Mackenzie C.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Georgia F.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Sam C.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Baylei M.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Marhin C.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "Madison M.",
    position: "Intern",
    status: "^ACTIVE^(status-active)",
  },
  {
    name: "David C.",
    position: "[REDACTED]",
    status: "^UNKNOWN^(status-unknown)",
  },
  {
    name: "Theodore M.",
    position: "[REDACTED]",
    status: "^MISSING^(status-missing)",
  },
  {
    name: "Tracy W.",
    position: "[REDACTED]",
    status: "^MISSING^(status-missing)",
  },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function moveCaretToEnd(el) {
  var range, selection;
  if (document.createRange) {
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(el); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  }
}

function scroll(el = document.querySelector(".terminal")) {
  el.scrollTop = el.scrollHeight;
}

const Terminal = {
  stopExecution: false,
  allowStopExecution: true,
  boot: async () => {
    await Terminal.clear();
    await Terminal.main();
    return;
    await Terminal.type([
      "Welcome to Sanctum Industries(TM) - Secure Network Terminal - v1.0251",
      "",
    ]);
    if (localStorage.getItem("sanctum_terminal_booted")) {
      await Terminal.type(
        [
          "PREVIOUS SESSION DETECTED.",
          `WELCOME BACK, ${
            localStorage.getItem("sanctum_terminal_username") ?? "USER"
          }.`,
        ],
        { lineWait: 750 }
      );
      await sleep(2500);
      await Terminal.clear();
      await Terminal.main();
      return;
    }
    await Terminal.type("TERMINAL BOOTING...", { initialWait: 1500 });
    await Terminal.type(
      [
        "> BUILDING MEMORY SECTORS...",
        "> READING DRIVES...",
        "> BUILDING OS...",
        "> ACCESSING NETWORK...",
        "> ACCESSING DATABASE...",
      ],
      { lineWait: 250 }
    );
    localStorage.setItem("sanctum_terminal_booted", true);
    await Terminal.type(
      [".......", "......", ".....", "....", "...", "..", "."],
      { lineWait: 150 }
    );
    await Terminal.type(["TERMINAL ONLINE.", "PREPARING FILES..."], {
      initialWait: 1500,
      lineWait: 500,
      newLine: false,
    });
    await sleep(2500);
    await Terminal.clear();
    await Terminal.main();
  },

  main: async () => {
    document.querySelector(".crt").addEventListener("click", () => {
      if (document.querySelector("[contenteditable='true']")) {
        document.querySelector("[contenteditable='true']").focus();
      }
    });
    await Terminal.clear();
    await Terminal.type(
      [
        "Sanctum Industries(TM) - Secure Network Terminal - Welcome, User",
        `"We serve in the shadows so you may walk in the light."`,
        "",
      ],
      { initialWait: 1500, lineWait: 250, allCaps: false }
    );
    Terminal.allowStopExecution = true;
    // if stopExecution is true, return
    document.addEventListener("keydown", (e) => {
      // if key is escape or Ctrl-C, stop execution
      if (e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        Terminal.stopExecution = true;
      }
    });
    await Terminal.input();
  },

  input: async (isPwd = false) => {
    Terminal.stopExecution = false;
    let terminal = document.querySelector(".terminal");
    let input = document.createElement("div");
    input.setAttribute("id", "input");
    input.setAttribute("contenteditable", true);
    // input.addEventListener("keydown", onKeyDown);
    terminal.appendChild(input);
    input.focus();

    // if the input is a password, give it the password class
    if (isPwd) input.classList.add("password");

    $(input).on("keydown", async (e) => {
      console.log(e);
      if (e.which == 13) {
        e.preventDefault();
        let text = $(input).text();
        input.setAttribute("contenteditable", false);
        await Terminal.command(input.textContent);
      }

      moveCaretToEnd(input);
    });
    input.focus();
  },

  clear: async () => {
    $(".terminal").empty();
  },

  type: async (text, options = {}) => {
    let {
      speed = 9.9,
      realistic = true,
      allCaps = true,
      initialWait = 1000,
      lineWait = 250,
      newLine = true,
      finalWait = 0,
    } = options;

    if (Terminal.stopExecution) {
      console.log("stopExecution is true, returning");
      return;
    }

    // if the text is an array
    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; i++) {
        // if i is 0, wait the initial wait time
        if (i == 0) {
          await sleep(initialWait);
        }
        await Terminal.type(
          text[i],
          i >= 1 ? { ...options, initialWait: lineWait } : options
        );
        if (i == text.length - 1) {
          // if i is the last item in the array, wait the final wait time
          await sleep(finalWait);
        }
      }
      return;
    }

    await sleep(initialWait);
    for (let i = 0; i < text.length; i++) {
      // if the character is a ^, match until the next ^ and convert the match to a span, matching the text in parentheses in match 1
      if (text[i] == "^") {
        let match = text.match(/\^(.*?)\^/);
        let className = text.match(/\((.*?)\)/);
        let span = document.createElement("span");
        span.innerHTML = match[1];
        document.querySelector(".terminal").appendChild(span);
        if (className) {
          span.classList.add(className[1]);
        }
        text = text.replace(match[0], "");
        text = text.replace(className[0], "");
        console.log(text, match, className);
        i--;
        continue;
      }
      $(".terminal").append(allCaps ? text[i].toUpperCase() : text[i]);
      await sleep(
        (1000 - speed * 100) * (realistic ? Math.max(Math.random(), 0.5) : 1)
      );

      document.querySelector(".scrollToLine").scrollIntoView(true);
    }
    // join all characters in the terminal into a string
    $(".terminal").html($(".terminal").html());

    $(".terminal").append(newLine ? "<br/>" : "&nbsp;");
    // scroll(document.querySelector(".scrollToLine"));
  },

  command: async (text) => {
    let cmd = text.toLowerCase().trim();
    // if text is not empty and text is a key in the Commands object
    if (cmd && Commands[cmd.split(" ")[0]]) {
      // run the command
      await Commands[cmd.split(" ")[0]].run(cmd.split(" ").slice(1));
    }
    await Terminal.input();
  },
};

const Commands = {
  help: {
    description: "Lists all available commands.",
    usage: "help",
    run: async () => {
      await Terminal.type(["", "AVAILABLE COMMANDS:"], { lineWait: 500 });
      // sort the commands by name
      let sortedCommands = Object.keys(Commands).sort();
      for (let i = 0; i < sortedCommands.length; i++) {
        let cmd = sortedCommands[i];
        await Terminal.type(
          [
            "",
            `${cmd} - ${Commands[cmd].description}`,
            `Usage: ${Commands[cmd].usage}`,
          ],
          { lineWait: 250, initialWait: 500 }
        );
      }
    },
  },

  waal: {
    description: "Review case file on T. Waal.",
    usage: "waal",
    run: async () => {
      await Terminal.type([
        "",
        "CASE FILE - T. WAAL",
        "======================",
        "",
        "NAME: Tracy Waal",
        "AGE: [REDACTED]",
        "POSITION: [REDACTED]",
        "",
      ]);
      await Terminal.type(
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        { lineWait: 100, newLine: false }
      );
      await Terminal.type(
        [
          "",
          "COULD NOT RETRIEVE DATA.",
          "FILE DATA CORRUPTED.",
          "FILE DATA CORRUPTED.",
          "",
        ],
        { lineWait: 500, initialWait: 0, finalWait: 2000 }
      );
    },
  },

  mendelssohn: {
    description: "Review case file on J. Mendelssohn.",
    usage: "mendelssohn",
    run: async () => {
      await Terminal.type([
        "",
        "CASE FILE - T. MENDELSSOHN",
        "======================",
        "",
        "NAME: T. Mendelssohn",
        "AGE: [REDACTED]",
        "POSITION: [REDACTED]",
        "",
        "DESCRIPTION:",
        "Dr. Theodore Mendelssohn is Sanctum's lead researcher and scientist. His work has been instrumental in the development of Sanctum's most advanced technologies, paving the for Sanctum's research into Unidentified Flying Objects (UFO), extra-terrestrial beings, [REDACTED], and interspatial anomalies. Dr. Mendelssohn is currently working on a project to develop a device that will allow Sanctum to better understand the nature of these anomalies. The device, codenamed [REDACTED], is currently in its testing phase, having successfully passed all preliminary trials.",
        "",
        "CASE NOTES:",
        "Dr. Mendelssohn is currently missing. His last known location was the Sanctum Research Facility, where he was working on the [REDACTED] project. He was last seen leaving the facility at 5:45 PM on 10/25/2022. He has not been seen or heard from since. All attempts to contact Dr. Mendelssohn have been unsuccessful. Sanctum's internal investigation teams have been dispatched to the the site of Project [REDACTED] to investigate the situation.",
        "",
      ]);
    },
  },

  employees: {
    description: "Review list of Sanctum employees.",
    usage: "employees",
    run: async () => {
      await Terminal.type([
        "",
        "SANCTUM EMPLOYEES (PROJECT [REDACTED])",
        "======================",
        "",
      ]);
      // sort the employees in the employee array by name
      let sortedEmployees = employees.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < sortedEmployees.length; i++) {
        let employee = sortedEmployees[i];
        await Terminal.type(
          [
            `NAME: ${employee.name}`,
            `POSITION: ${employee.position}`,
            `STATUS: ${employee.status}`,
            "",
          ],
          { lineWait: 125, initialWait: 250 }
        );
      }
    },
  },

  clear: {
    description: "Clears the terminal.",
    usage: "clear",
    run: async () => {
      await Terminal.clear();
    },
  },

  "projectx": {
    description: "[REDACTED]",
    usage: "projectx",
    run: async () => {
      // require password
      await Terminal.input(true);
      await Terminal.type([
        "",
        "PROJECT [REDACTED]",
        "======================",
        "",
        "PROJECT [REDACTED] IS A [REDACTED] PROJECT CURRENTLY IN DEVELOPMENT AT SANCTUM. THE PROJECT IS CURRENTLY IN ITS [REDACTED] PHASE.",
        "",
      ]);
    }
  },
};
