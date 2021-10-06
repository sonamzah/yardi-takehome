// APP
let initialized = false;
// CONFIG
const WIDTH_BRONZE = 60;
const WIDTH_SILVER = 80;
const WIDTH_GOLD = 96;
// Pretend these are coming from a data base through an async API call
const USER_LEADS_PROG = 32;
// const USER_LEADS_PROG = 0;
const USER_APPTS_PROG = 83;
// const USER_APPTS_PROG = 0;
const USER_MOVEINS_PROG = 62;
// const USER_MOVEINS_PROG = 0;

//----------
// Globals
//----------
const appButton = document.querySelector(".btn-app");
const statusDropdownButton = document.querySelector("#dropdownMenuButton1");
const statusDropdownMenu = document.querySelector(".status-dropdown-menu");
const popoverPointsInMonth = document.querySelector(".popover-points-month");
const toggleDetails = document.querySelector("#toggleDetails");
const progBars = [...document.querySelectorAll(".progress-bar-badge")];

const rankingListGroup = document.querySelector(".list-group-ranking");

//--------------------
// Changing BS settings
//--------------------
// Adding tables to Bootstrap sanitizers whitelist
var myDefaultAllowList = bootstrap.Tooltip.Default.allowList;
// To allow table elements
myDefaultAllowList.table = [];
// To allow td elements and data-bs-option attributes on td elements
myDefaultAllowList.td = ["data-bs-option"];
// console.log(myDefaultAllowList);

// ----------------------------------
// Change status -- status drop-down:
//  Using event delegation
// ----------------------------------
statusDropdownMenu.addEventListener("click", (event) => {
  if (event.target.id === "statusAvailable")
    statusDropdownButton.innerHTML =
      "<i class='bi bi-circle-fill text-success'></i> Available";
  if (event.target.id === "statusBusy")
    statusDropdownButton.innerHTML =
      "<i class='bi bi-circle-fill text-danger'></i> Busy";
});

//----------------------------------------
// Show Point Summary Table inside popover
//----------------------------------------
// Setting content programatically does not work -- sanitizer must be blocking table elements?
// popoverPointsInMonth.setAttribute("data-bs-content", `{HTML for table here}`);

// Select the bootstrap popover using getInstance() then inject html (insertAdjacentHTML) to .popover child: .popover-body
const popover = bootstrap.Popover.getInstance(popoverPointsInMonth);
// alternatively use Array.from(popover.children)
const popoverBody = [...popover.getTipElement().children].find((el) =>
  el.classList.contains("popover-body")
);

const generateTable = function (id) {
  // Control for which user data to recieve
  // const userData = callToYardiAPI.getUserPointsData(id)
  //-- returns JSON or Array with which table markup can be generated dynamically
  // const fakeDataFromAPI = {...};
  const tableMarkup = `<table class="w-100 table-custom" id="tableUserSummary">
                        <thead>
                          <tr>
                            <th scope="col">Point Summary</th>
                            <th scope="col">Points</th>
                          </tr>
                        </thead>
                        <!-- First Rank Points Summary Table -->
                        <tbody>
                          <!-- Row 1 -->
                          <tr>
                            <!-- TODO:: Uniformize all the tds using the first one! -->
                            <td>
                              <div
                                class="
                                  constrain-td-width
                                  d-flex
                                  justify-content-start
                                "
                              >
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-count
                                    shaded
                                    rounded-circle
                                    text-center
                                  "
                                >
                                  <p>15</p>
                                </div>
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-name
                                    ms-1
                                  "
                                >
                                  <p class="ps-2">New Leads / Prospects</p>
                                </div>
                              </div>
                            </td>
                            <td class="points points-leads-count text-center">
                              75
                            </td>
                          </tr>
                          <!-- Row 2 -->
                          <tr>
                            <td>
                              <div
                                class="
                                  constrain-td-width
                                  d-flex
                                  justify-content-start
                                "
                              >
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-count
                                    shaded
                                    rounded-circle
                                    text-center
                                  "
                                >
                                  <p>7</p>
                                </div>
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-name
                                    ms-1
                                  "
                                >
                                  <p class="ps-2">Convert Leads to Lease</p>
                                </div>
                              </div>
                            </td>
                            <td
                              class="points points-conversion-count text-center"
                            >
                              20
                            </td>
                          </tr>
                          <!-- Row 3 -->
                          <tr>
                            <td>
                              <div
                                class="
                                  constrain-td-width
                                  d-flex
                                  justify-content-start
                                "
                              >
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-count
                                    shaded
                                    rounded-circle
                                    text-center
                                  "
                                >
                                  <p>4</p>
                                </div>
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-name
                                    ms-1
                                  "
                                >
                                  <p class="ps-2">Follow-Ups</p>
                                </div>
                              </div>
                            </td>
                            <td
                              class="points points-followups-count text-center"
                            >
                              16
                            </td>
                          </tr>
                          <!-- Row 4 -->
                          <tr>
                            <td>
                              <div
                                class="
                                  constrain-td-width
                                  d-flex
                                  justify-content-start
                                "
                              >
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-count
                                    shaded
                                    rounded-circle
                                    text-center
                                  "
                                >
                                  <p>17</p>
                                </div>
                                <div
                                  class="
                                    d-flex
                                    align-items-center
                                    justify-content-center
                                    category-name
                                    ms-1
                                  "
                                >
                                  <p class="ps-2">Unit Shows</p>
                                </div>
                              </div>
                            </td>
                            <td class="points points-shows-count text-center">
                              04
                            </td>
                          </tr>
                        </tbody>
                      </table>`;
  return tableMarkup;
};

// Injects html markup into the popover element right after popover show event class is added
popoverPointsInMonth.addEventListener("inserted.bs.popover", () => {
  // generate table markup from most recent data for user
  const popoverTableUser = generateTable(); // In practice you could supply an id to generateTable to dynamically create markup
  console.log(popoverTableUser);
  popoverBody.innerHTML = "";
  popoverBody.insertAdjacentHTML("afterbegin", popoverTableUser);
});

//---------------------------
// Toggle "show/hide details"
//---------------------------
toggleDetails.addEventListener("click", (e) => {
  toggleDetails.classList.contains("details-hidden")
    ? (toggleDetails.textContent = "Hide details")
    : (toggleDetails.textContent = "Show details");
  // adds or removes .details-hidden
  toggleDetails.classList.toggle("details-hidden");
});

//-------
// Badges
//-------
//-------
// (To make this nicer, with more time -- I would implement more of a MVC style View rendering interface.
// Particularly, there would be an abstract/top-level parent View class with basic necessary component functions like root/parentNode, .render(), refresh(), delEl()...
// All <!-- SECTIONS --> in the markup would recieve their own extending class of View with their explicitly
//  defined.render() markup templates.
// The Badge class would have its own 3 extending children: 'LeadsFollowUps', 'ApptsShowings', 'MoveInsRenewals' with their own respective rootNodes
//  This way code can cleanly be reused among the three differing categories of BadgeProgressBar since the core functions
//   [increment(), decrement(), updateIcon(), callToYardiApiForBadgeData(), etc..] are going to be the same)

// Increment/decrement progress bar by <amount> %
function updateProgressBar(target, amount) {
  if (!target || !target.tagName)
    return console.log("Supply a .progress-bar DOM Element to increment");
  if (!Number.isFinite(amount))
    return console.log("Please eneter a number (-/+ valid)");

  const width = target.getBoundingClientRect().width;
  const parentWidth = target.offsetParent.getBoundingClientRect().width;
  const widthPercent = Math.ceil((100 * width) / parentWidth);
  target.style.width = `${widthPercent + amount}%`;
}
const leadProgressBar = document
  .querySelector("#badgeLeadsRow")
  .querySelector(".progress-bar");

// Update Symbol as per badge rank
// function updateProgressBadges(target) {} //This is being taken care by the resizeObserver... thought its not a great solution

// Not very good for performance -- looks like it fires every time one pixel resize occurs
let resizeObserver = new ResizeObserver((obs) => {
  // console.log("observing:", obs);
  obs.forEach((entry) => {
    // const [entry] = ob;

    // Next 3 lines can be abstracted
    const width = entry.contentRect.width;
    const parentWidth = entry.target.offsetParent.getBoundingClientRect().width;
    const widthPercent = Math.ceil((100 * width) / parentWidth);

    // Check if getting bigger
    const parent = entry.target.closest(".figure");

    if (widthPercent > WIDTH_BRONZE) {
      const listAwardBronze = parent.querySelector(".progress-li-bronze");
      // add class awarded to the changed list-item
      listAwardBronze.classList.add("awarded");
      // change the icon from circle to award
      listAwardBronze.innerHTML = `<i class="bi bi-award-fill award award-bronze"></i>`;
    }
    if (widthPercent > WIDTH_SILVER) {
      const listAwardSilver = parent.querySelector(".progress-li-silver");
      // add class awarded to the changed list-item
      listAwardSilver.classList.add("awarded");
      // change the icon from circle to award
      listAwardSilver.innerHTML = `<i class="bi bi-award-fill award award-silver"></i>`;
    }
    if (widthPercent > WIDTH_GOLD) {
      const listAwardGold = parent.querySelector(".progress-li-gold");
      // add class awarded to the changed list-item
      listAwardGold.classList.add("awarded");
      // change the icon from circle to award
      listAwardGold.innerHTML = `<i class="bi bi-award-fill award award-gold"></i>`;
    }

    // Check if getting smaller
    // For this project Im going to assume that points are not reversable
  });
});

// Mock get badge ranks from API
//  & set before opening?
// (Dummy data -- just return an array of %s)
// in the wild this would be Async/await
const fakeGetBadgeDataAPI = function () {
  return {
    leads: USER_LEADS_PROG,
    appts: USER_APPTS_PROG,
    moveins: USER_MOVEINS_PROG,
  };
};

// TODO:: function to update the figure-label.
// ex. XX more points to reach Gold!

// Month Ranking -- Toggle class for collapse links
rankingListGroup.addEventListener("click", (e) => {
  console.log(e.target.closest(".ranking-item"));
  e.target.closest(".ranking-item").classList.toggle("shaded");
});

//TODO -- Remove this later
document.querySelector(".settings").addEventListener("click", () => {
  progBars.forEach((prog) => {
    updateProgressBar(prog, 10);
  });
});

//Initialize variables
const init = function () {
  console.log("init() running");
  // setBadgeFrom API
  const badgeData = fakeGetBadgeDataAPI();

  console.log(progBars.length, progBars);
  // definitely not a pretty way to do all this...
  // MVC or using custom data- attributes somehow? or both!
  progBars.forEach((prog) => {
    // resizeObserver.observe(leadProgressBar);
    resizeObserver.observe(prog);

    if (prog.classList.contains("leads-progress")) {
      console.log("prog: ", prog);
      console.log("badgeLeads: ", badgeData.leads);
      updateProgressBar(prog, badgeData.leads);
    }
    if (prog.classList.contains("appts-progress")) {
      console.log("prog: ", prog);
      console.log("badgeAppts: ", badgeData.appts);
      updateProgressBar(prog, badgeData.appts);
    }
    if (prog.classList.contains("moveins-progress")) {
      console.log("prog: ", prog);
      console.log("badgeMoveins: ", badgeData.moveins);
      updateProgressBar(prog, badgeData.moveins);
    }
  });
};

// init()
appButton.addEventListener("click", () => {
  if (initialized) return;
  setTimeout(init, 300);
  initialized = true;
});
