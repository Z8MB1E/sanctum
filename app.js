const employees = [
  {
    name: "Jason F.",
    position: "Chief Executive Officer",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Amy F.",
    position: "[REDACTED]",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Jane D.",
    position: "[REDACTED]",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "KJ J.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Zach B.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Randy J.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Alyssa F.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Alex P.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Taryn W.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Mackenzie C.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Georgia F.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Sam C.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Baylei M.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Marhin C.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "Madison M.",
    position: "Intern",
    status: "^ACTIVE[status-active]^",
  },
  {
    name: "David C.",
    position: "[REDACTED]",
    status: "^UNKNOWN[status-unknown]^",
  },
  {
    name: "Theodore M.",
    position: "Project Lead, [REDACTED]",
    status: "^MISSING[status-missing]^",
  },
  {
    name: "Tracy W.",
    position: "[REDACTED]",
    status: "^MISSING[status-missing]^",
  },
];

const logFiles = [
  {
    fileName: "intern.1",
    name: "Intern's Log (1/4)",
    date: "02/22/2022",
    data: [
      `I got in! I thought my interview was a bit shy of golden, but it doesn't matter now - SANCTUM INDUSTRIES clearly thought I had some kind of mettle when they hired me. I'm not sure what I'm going to do here, but I'm sure I'll find out soon enough.`,
      "",
      `I've heard rumors that there is some classified project that is finishing its last preliminary trials, and I might get to be a part of it. Classified! That's almost too cool. I guess it paid off to get that Master's in theoretical physics.`,
      "",
      `Well, let's get started!`,
    ],
  },
  {
    fileName: "intern.2",
    name: "Intern's Log (2/4)",
    date: "03/15/2022",
    data: [
      `No. Way. I still can't believe it... Not only am I assigned to the project, but I even get to work with the legendary Dr. Mendelssohn! He's, like, big time around here. Even the CEO is a bit intimidated by him, I think, though I suppose I can't blame him... how do you even begin to compete with a Nobel Prize winner?`,
      "",
      `I'm going to have to work hard to keep up with him, but I'm sure I'll be able to. I'm going to be a part of something big here, I just know it.`,
    ],
  },
  {
    fileName: "intern.3",
    name: "Intern's Log (3/4)",
    date: "07/29/2022",
    data: [
      `Project [REDACTED] is on schedule for testing in late October. I'm not sure how the results are going to compare to the preliminary trials, but if I learned anything from being around Dr. Mendelssohn, it's that I know nothing. Sure, I'm a theoretical physicist, but he's a Nobel Prize winner and the lab's top dog. I'm sure he knows what he's doing.`,
      "",
      `If I'm being honest, I'm not sure what I'm going to do after the project is over. I'm not sure I want to go back to school, but I'm not sure I want to stay here either. I guess I'll just have to wait and see. The Project doesn't wait for anyone, least of all me!`,
    ],
  },
  {
    fileName: "intern.4",
    name: "Intern's Log (4/4)",
    date: "10/25/2022",
    data: [
      `Dr. Mendelssohn has vanished. No one knows what happened to him, and every one of our questions to the higher-ups is answered the same way: "An investigation is underway. Keep working, stick to the timeline, and stay focused." Not the most encouraging thing to say to the people who have worked with Dr. Mendelssohn on the Project every day for the past year.`,
      "",
      `The Project was scheduled for testing on 10/██, but this development has thrown everything off-course. The CEO called for a mandatory all-hands and told us that the Board has arranged for several private investigation teams to look into the disappearance. I'm not sure what to think. I'm not sure what to do. I'm not sure what's going to happen next.`,
      "",
      `I just hope they find him.`,
    ],
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
  skipTyping: false,
  boot: async () => {
    await Terminal.clear();
    // if localhost
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "192.168.1.130"
    ) {
      console.log("localhost - skipping boot sequence");
      // $(".work-in-progress").remove();
      await Terminal.main();
      return;
    }
    await Terminal.type([
      "Welcome to Sanctum Industries(TM) - Secure Network Terminal - v1.0251",
      "",
    ]);
    if (localStorage.getItem("sanctum_terminal_booted")) {
      await Terminal.type(
        [
          "PREVIOUS SESSION DETECTED.",
          `WELCOME BACK, ${
            localStorage.getItem("sanctum_terminal_name") ?? "USER"
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
    // add event listener to detect if Enter is pressed while not input, and if so, set skipTyping to true
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !document.querySelector("[contenteditable='true']")
      ) {
        Terminal.skipTyping = true;
      }
    });

    await Terminal.clear();
    await Terminal.type(
      [
        `Sanctum Industries(TM) - Secure Network Terminal - Welcome, ^${
          localStorage.getItem("sanctum_terminal_name") ?? "USER"
        }{userName}^`,
        `"We serve in the shadows so you may walk in the light."`,
        "",
      ],
      { initialWait: 500, lineWait: 250, allCaps: false }
    );
    // show the sanctum logo
    $(".logo > img").addClass("logo-visible");
    Terminal.allowStopExecution = true;
    // if stopExecution is true, return
    document.addEventListener("keydown", (e) => {
      // if key is escape or Ctrl-C, stop execution
      if (e.key === "Escape" || (e.ctrlKey && e.key === "c")) {
        Terminal.stopExecution = true;
      }
    });
    await Terminal.loop();
  },

  loop: async () => {
    let cmd = await Terminal.input();
    await Terminal.command(cmd);
    return Terminal.loop();
  },

  input: async (isPwd = false) => {
    return new Promise((resolve) => {
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
        // window.alert(e.which);
        if (e.which == 13) {
          e.preventDefault();
          let text = $(input).text();
          input.setAttribute("contenteditable", false);
          console.log(text, input.textContent);
          return resolve(input.textContent);
        }

        moveCaretToEnd(input);
      });

      input.focus();
    });
  },

  password: async () => {
    return await Terminal.input(true);
  },

  clear: async () => {
    $(".terminal").empty();
  },

  type: async (text, options = {}) => {
    let {
      speed = 9.75,
      realistic = true,
      allCaps = true,
      initialWait = 500,
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
          await sleep(Terminal.skipTyping ? 50 : initialWait);
        }
        await Terminal.type(
          text[i],
          i >= 1 ? { ...options, initialWait: lineWait } : options
        );
        if (i == text.length - 1) {
          // if i is the last item in the array, wait the final wait time
          await sleep(Terminal.skipTyping ? 50 : finalWait);
        }
      }
      return;
    }

    await sleep(Terminal.skipTyping ? 50 : initialWait);
    for (let i = 0; i < text.length; i++) {
      // if the character is a ^, match until the next ^ and convert the match to a span, matching the text in parentheses in match 1
      if (text[i] == "^") {
        let match = text.match(/\^(.*?)\^/);
        // make sure that className and id are in within the first match
        let className = match[1].match(/(?:\[)(.*?)(?:\])/);
        let id = match[1].match(/(?:\{)(.*?)(?:\})/);
        console.log(match, className, id);
        // let className = text.match(/\((.*?)\)/);
        // let id = text.match(/\[(.*?)\]/);
        let span = document.createElement("span");
        span.innerHTML = match[1];
        document.querySelector(".terminal").appendChild(span);
        text = text.replace(match[0], "");
        if (className) {
          span.classList.add(className[1]);
          // replace brackets with nothing
          span.innerHTML = span.innerHTML.replace(/\[(.*?)\]/, "");
          text = text.replace(className[0], "");
        }
        if (id) {
          span.setAttribute("id", id[1]);
          span.innerHTML = span.innerHTML.replace(id[0], "");
          // replace curly braces with nothing
          span.innerHTML = span.innerHTML.replace(/\{(.*?)\}/, "");
          text = text.replace(id[0], "");
        }
        // console.log(text, match, className);
        i--;
        continue;
      }
      $(".terminal").append(allCaps ? text[i].toUpperCase() : text[i]);
      await sleep(
        Terminal.skipTyping ? 1 : (1000 - speed * 100) * (realistic ? Math.max(Math.random(), 0.5) : 1)
      );

      document.querySelector(".scrollToLine").scrollIntoView(true);
    }
    // join all characters in the terminal into a string
    $(".terminal").html($(".terminal").html());

    $(".terminal").append(newLine ? "<br/>" : "&nbsp;");
    // scroll(document.querySelector(".scrollToLine"));
    Terminal.skipTyping = false;
  },

  command: async (text) => {
    console.log("command called");
    let cmd = text.toLowerCase().trim();
    // if text is not empty and text is a key in the Commands object
    if (cmd && Commands[cmd.split(" ")[0]]) {
      // run the command
      await Commands[cmd.split(" ")[0]].run(cmd.split(" ").slice(1));
      console.log(`cmd: ${cmd.split(" ").slice(1)}`);
    } else if (cmd) {
      // else, print an error
      await Terminal.type(`${cmd}: command not found`);
    }
    // await Terminal.input();
  },
};

const Commands = {
  help: {
    description: "Lists all available commands.",
    usage: "help",
    run: async () => {
      await Terminal.type(["","You may increase output speed by holding ENTER, or interrupt program execution with Escape or Ctrl-C."]);
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
      await Terminal.type("");
    },
  },

  waal: {
    description: "Review case file on T. Waal.",
    usage: "waal",
    run: async () => {
      await Terminal.type([
        "",
        "NO IMAGE FOUND.",
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
      await sleep(500);
      $(".terminal").append(
        `<div class="image"><img src="/uploads/events/Sanctum/mendelssohn-crt.png"></img><div>`
      );
      await Terminal.type(
        [
          "",
          "CASE FILE - T. MENDELSSOHN",
          "======================",
          "",
          "NAME: T. Mendelssohn",
          "AGE: [REDACTED]",
          "POSITION: PROJECT LEAD, [REDACTED]",
          "",
          "DESCRIPTION:",
          "Dr. Theodore Mendelssohn is Sanctum's lead researcher and scientist. His work has been instrumental in the development of Sanctum's most advanced technologies, paving the way for Sanctum's research into Unidentified Flying Objects (UFO), extra-terrestrial beings, [REDACTED], and interspatial anomalies. Dr. Mendelssohn is currently working on a project to develop a device that will allow Sanctum to better understand the nature of these anomalies. The device, codenamed [REDACTED], is currently in its testing phase, having successfully passed all preliminary trials.",
          "",
          "CASE NOTES:",
          "Dr. Mendelssohn is currently missing. His last known location was the Sanctum Research Facility hidden underneath the campus of ████, where he was working on the [REDACTED] project. He was last seen leaving the facility at 5:45 PM on 8/26/2022. He has not been seen or heard from since. All attempts to contact Dr. Mendelssohn have been unsuccessful. Sanctum's internal investigation teams have been dispatched to the site of Project [REDACTED] to investigate the situation and are expected to arrive by 10/28.",
          "",
        ],
        { initialWait: 500 }
      );
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

  setname: {
    description: "Sets your name in the system.",
    usage: "setname [name]",
    run: async (args) => {
      if (args.length === 0) {
        await Terminal.type("Please provide a name.");
      } else {
        // make every first letter of every word uppercase
        args = args.map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
        let name = args.join(" ");
        // make sure name is not a bad word
        if (name.trim() === "" || name.length > 20 || name.length < 3) {
          await Terminal.type("Invalid name.");
          return;
        }
        // use purgomalum to check if name is a bad word
        let response = await fetch(
          `https://www.purgomalum.com/service/containsprofanity?text=${name}`
        );
        let isBadWord = await response.text();
        if (isBadWord === "true") {
          await Terminal.type("Invalid name.");
          return;
        }
        localStorage.setItem("sanctum_terminal_name", name);
        $("#userName").text(name);
        await Terminal.type(`Name set to ${name}.`);
      }
    },
  },

  projectx: {
    description: "[REDACTED]",
    usage: "projectx",
    run: async () => {
      // require password
      if (localStorage.getItem("sanctum_terminal_projectx") !== "true") {
        await Terminal.type(["", "Please enter password:"], {
          initialWait: 500,
          lineWait: 0,
          finalWait: 0,
        });
        let pass = await Terminal.password();
        console.log({ pass });
        if (pass.toLowerCase().trim() !== "mvnu") {
          await Terminal.type(["Invalid password.", ""]);
          return;
        } else {
          localStorage.setItem("sanctum_terminal_projectx", "true");
          await Terminal.type(
            ["Access granted. Saving access credentials...", "Saved."],
            { lineWait: 1000 }
          );
          return Terminal.command("projectx");
        }
      } else {
        await Terminal.type(
          ["", "PROJECT [REDACTED]", "======================"],
          { initialWait: 500, finalWait: 1000 }
        );
        await Terminal.type(
          [
            "",
            "PROJECT [REDACTED] is a top-secret project being conducted by Sanctum. The project is currently in its testing phase and is expected to be completed by 10/██/2022. The project is being led by Dr. Theodore Mendelssohn, who is currently missing. All attempts to contact Dr. Mendelssohn have been unsuccessful. Sanctum's internal investigation teams have been dispatched to the site of Project [REDACTED] to investigate the situation and are expected to arrive by 10/██.",
            "",
            "The Project's nature is classified. All information regarding Project [REDACTED] is strictly confidential. Improper access to this file may result in immediate termination and/or legal action. If you are not authorized to access this file, please exit immediately.",
            "",
            "Note: This file contains every report by Dr. Mendelssohn regarding Project [REDACTED] and is therefore relatively lengthy. If you would like to end the readout of the report, please press Escape or Ctrl+C.",
            "",
            "======================",
            "",
          ],
          { finalWait: 2000 }
        );
        await Terminal.type(
          [
            "MENDELSSOHN REPORT, 01/██/2022",
            `The readings are undeniable: extraterrestrial life, at our doorstep. We look to the stars and wonder what lies beyond our own planet. We have sent probes to the farthest reaches of our solar system, and beyond. We have discovered planets that could potentially support life, and we have found evidence of water on Mars, but we had yet to find any evidence of life beyond our own planet.`,
            "",
            "Until now. We do not know of their origin, nor are we certain of their intentions. They have left us in the dark, and they have done nothing to communicate with us. We do not know if they are friend or foe, but if there is one thing Sanctum knows, it is that we must keep the world safe. We have been preparing for a moment like this for years, and now, we are ready. We have developed a new technology that will allow us to perform situational analysis and artificial ███████████ for this exact purpose, with the ultimate goal of protecting the world from any threat that may arise. We have named this technology Project [REDACTED]. Work begins on the preliminary testing phases of ███ ██████████ in the following weeks.",
            "",
            "MENDELSSOHN REPORT, 03/██/2022:",
            `The Project is concluding its second of four testing phases next week. Soon we should have a working prototype of the [REDACTED] device. I am confident that this device will be a game-changer not only for the future of Sanctum, but for the future of the world. There is nothing more important than the safety of our planet, and I am proud to be a part of a team that is working to ensure that safety. My team and I will continue to work tirelessly to ensure that Project [REDACTED] is a success.`,
          ],
          { allCaps: false }
        );
        $(".terminal").append(`
        <div class="image relative"><img src="/uploads/events/Sanctum/globe-crt.png"><div class="pulsing-circle" style=" top: 34%; left: 32%; "></div> <div class="pulsing-circle" style=" top: 69%; left: 34%; "></div> <div class="pulsing-circle" style=" top: 13%; left: 33%; "></div> <div class="pulsing-circle" style=" top: 10%; left: 62%; "></div> <div class="pulsing-circle" style=" top: 29%; left: 78%; "></div> <div class="pulsing-circle" style=" top: 35%; left: 57%; "></div> <div class="pulsing-circle" style=" top: 67%; left: 79%; "></div> </div>
        `);
        await Terminal.type(
          [
            "",
            "MENDELSSOHN REPORT, 04/██/2022, IMAGE ATTACHED ABOVE:",
            `Sanctum's ███-██-███-███ Division has been receiving reports of missing people with extraordinary circumstances regarding their disappearances. The reports are coming in from all over the world, and they seem to share one commonality: they happened after sundown, and there were never any witnesses. Strangely enough, the last-known locations of the missing people were near several of our international satellite research laboratories. It is not yet clear whether this is an important factor, but we remain vigilant at all of our locations in case of disappearances. We have dispatched several of our internal investigation teams to the sites of the reported disappearances to investigate the situation. In the meantime, work on the Project will continue as usual.`,
          ],
          { initialWait: 1000, allCaps: false }
        );
        $(".terminal").append(`
          <div class="image relative"><img src="/uploads/events/Sanctum/alien-1.png"></div>
          `);
        await Terminal.type(
          [
            "MENDELSSOHN REPORT, 06/██/2022, IMAGE ATTACHED ABOVE:",
            `None of us can believe it. Today, during our fourth and final test of the device, we caught a glimpse of what we believe to be one of the alien creatures. The device exposed an isolated pocket of emergent ionizing radiation near the campus of ████, our cover for the Project. The radiation seemed to be physically translating via a means similar to that of a human being. When we recalibrated the ████████████ of the device, the radiation pocket shifted energy signature and, within a matter of seconds, translated into a physical, visual form.`,
            "",
            `It was only for a moment, and only one of our cameras caught an image of the anomaly, but it was enough. We have been able to analyze the image and have determined that it is a living creature. We are unsure of its true nature, but its appearance is definitely not human. It moved with what can only be described as "erratic hostility." Dr. █████ believed that the anomaly seemed "extremely agitated," perhaps due to our ability to discern its physical form. The truth is uncertain.`,
            "",
            `This could be the first time a human has ever encountered alien life and successfully recorded it. The creature vanished shortly after the image was captured, but we were able to track the location of the radiation pocket for several hours before it too had vanished. From what we have gathered, the creature has remained within at least a mile of ████'s campus. We did not see any other anomalies, but we are continuing to monitor the area.`,
            "",
          ],
          { initialWait: 1000, allCaps: false }
        );
        await Terminal.type(
          [
            "ADDITIONAL DATA ENCRYPTED. DECRYPTION PROCESS INITIATED.",
            "...",
            "...",
            "THIS PROCESS MAY TAKE SOME TIME. PLEASE CHECK BACK SOON.",
            ""
          ],
          { initialWait: 1000, lineWait: 1500 }
        )
      }
    },
  },

  logfile: {
    description: "Review one or more log files.",
    usage: "logfile [name of file]",
    run: async (args) => {
      if (args.length === 0) {
        await Terminal.type([
          "",
          "ERROR: NO LOG FILE SPECIFIED. PLEASE SPECIFY A LOG FILE (EG. 'LOGFILE LOG.1').",
          "AVAILABLE LOG FILES:",
          "",
        ]);
        for (let i = 0; i < logFiles.length; i++) {
          const log = logFiles[i];
          await Terminal.type(`${log.fileName} - ${log.name}`, {
            initialWait: 250,
          });
        }
      } else {
        const log = logFiles.find((log) => log.fileName === args[0]);
        if (log) {
          await Terminal.type([
            "",
            `${log.fileName} - ${log.name}`,
            `DATE: ${log.date}`,
            "======================",
            "",
          ]);
          await Terminal.type([...log.data, ""], {
            lineWait: 1000,
            allCaps: false,
            finalWait: 2000,
          });
        } else {
          await Terminal.type([
            "",
            "ERROR: INVALID LOG FILE. PLEASE SPECIFY A VALID LOG FILE (EG. 'LOGFILE LOG.1').",
            "AVAILABLE LOG FILES:",
            "",
          ]);
          for (let i = 0; i < logFiles.length; i++) {
            const log = logFiles[i];
            await Terminal.type(`${log.fileName} - ${log.name}`, {
              initialWait: 250,
            });
          }
        }
      }
    },
  },
};
