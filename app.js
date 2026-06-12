/**
 * National Tour and Travel - Chauffeur-Driven Car Rental Client Application Logic
 * Adapted for strictly Chauffeur-driven outstation, local hourly, and airport transfers.
 */

// ==========================================================================
// MOCK CHAUFFEUR FLEET DATASET
// ==========================================================================
const CAR_FLEET = [
    {
        id: "cab-01",
        name: "Mahindra Scorpio-N",
        category: "suv",
        image: "images/suv.webp",
        seats: 7,
        luggage: "4 Bags",
        perKmRate: 18,
        localPackageRates: {
            "4h-40k": 2200,
            "8h-80k": 3600,
            "12h-120k": 4800
        },
        airportFlatRate: 1800,
        rating: 4.9,
        trips: 184,
        chauffeur: "Satish T. (Senior Highway Driver)",
        description: "Rugged outstation specialist. Excellent for Chambal terrains and long expressway runs."
    },
    {
        id: "cab-02",
        name: "Hyundai i20 Elite",
        category: "hatchback",
        image: "images/hatchback.webp",
        seats: 5,
        luggage: "2 Bags",
        perKmRate: 11,
        localPackageRates: {
            "4h-40k": 1200,
            "8h-80k": 2000,
            "12h-120k": 2800
        },
        airportFlatRate: 1000,
        rating: 4.7,
        trips: 92,
        chauffeur: "Ramesh K. (City Transfer Driver)",
        description: "Compact and clean hatchback. Perfect for narrow city lanes and solo/couple drops."
    },
    {
        id: "cab-03",
        name: "Honda City i-VTEC",
        category: "sedan",
        image: "images/sedan.webp",
        seats: 5,
        luggage: "3 Bags",
        perKmRate: 13,
        localPackageRates: {
            "4h-40k": 1600,
            "8h-80k": 2800,
            "12h-120k": 3800
        },
        airportFlatRate: 1400,
        rating: 4.8,
        trips: 120,
        chauffeur: "Madan G. (Executive Route Chauffeur)",
        description: "Smooth, silent executive cruiser. Highly recommended for corporate travel and family drops."
    },
    {
        id: "cab-04",
        name: "Toyota Innova Crysta",
        category: "mpv",
        image: "images/mpv.webp",
        seats: 8,
        luggage: "6 Bags",
        perKmRate: 21,
        localPackageRates: {
            "4h-40k": 2500,
            "8h-80k": 4200,
            "12h-120k": 5500
        },
        airportFlatRate: 2200,
        rating: 4.96,
        trips: 245,
        chauffeur: "Devendra S. (Pan-India Tour Captain)",
        description: "Gold standard for group comfort. Immense luggage space and comfortable captain seats."
    },
    {
        id: "cab-05",
        name: "Mercedes-Benz C-Class",
        category: "luxury",
        image: "images/luxury.webp",
        seats: 5,
        luggage: "3 Bags",
        perKmRate: 38,
        localPackageRates: {
            "4h-40k": 6000,
            "8h-80k": 10000,
            "12h-120k": 14000
        },
        airportFlatRate: 5000,
        rating: 5.0,
        trips: 34,
        chauffeur: "Jaswant Singh (VVIP Protocol Chauffeur)",
        description: "Uncompromised luxury. Background-verified uniform-clad protocol driver."
    },
    {
        id: "cab-06",
        name: "Maruti Swift",
        category: "hatchback",
        image: "images/hatchback_swift.webp",
        seats: 5,
        luggage: "2 Bags",
        perKmRate: 11,
        localPackageRates: {
            "4h-40k": 1200,
            "8h-80k": 2000,
            "12h-120k": 2800
        },
        airportFlatRate: 1000,
        rating: 4.6,
        trips: 310,
        chauffeur: "Hari Om P. (Local Gwalior-Morena Driver)",
        description: "Super reliable, highly economical hatchback. Standard for quick business visits."
    },
    {
        id: "cab-07",
        name: "Mahindra Thar 4x4",
        category: "suv",
        image: "images/suv_thar.webp",
        seats: 4,
        luggage: "2 Bags",
        perKmRate: 19,
        localPackageRates: {
            "4h-40k": 2400,
            "8h-80k": 3800,
            "12h-120k": 5000
        },
        airportFlatRate: 1900,
        rating: 4.91,
        trips: 152,
        chauffeur: "Vikram Tomar (Adventure Route Driver)",
        description: "Rugged offroad SUV. For rough routes, mountain drops, and heavy weather terrains."
    },
    {
        id: "cab-08",
        name: "Skoda Slavia TSI",
        category: "sedan",
        image: "images/sedan_slavia.webp",
        seats: 5,
        luggage: "3 Bags",
        perKmRate: 14,
        localPackageRates: {
            "4h-40k": 1700,
            "8h-80k": 2900,
            "12h-120k": 4000
        },
        airportFlatRate: 1500,
        rating: 4.78,
        trips: 76,
        chauffeur: "Sanjay D. (Highway Express Driver)",
        description: "European comfort sedan with large boot. Dynamic safety systems for long highway runs."
    }
];

// ==========================================================================
// MOCK DISTANCE MATRIX (ROUTE ROUTER)
// ==========================================================================
const ROUTE_DISTANCES = {
    "Morena-Delhi NCR": 350,
    "Morena-Agra": 120,
    "Morena-Gwalior": 40,
    "Morena-Bhopal": 420,
    "Morena-Indore": 580,
    
    "Gwalior-Delhi NCR": 390,
    "Gwalior-Agra": 120,
    "Gwalior-Bhopal": 420,
    "Gwalior-Morena": 40,
    
    "Delhi NCR-Agra": 240,
    "Delhi NCR-Morena": 350,
    "Delhi NCR-Gwalior": 390,
    
    "Agra-Delhi NCR": 240,
    "Agra-Morena": 120,
    "Agra-Gwalior": 120,
    
    "Mumbai-Pune": 150,
    "Pune-Mumbai": 150
};

const CITIES = [
    { value: "Morena", label: "Morena (Madhya Pradesh)", group: "Headquarters" },
    { value: "Delhi NCR", label: "Delhi NCR", group: "Major Metro Cities" },
    { value: "Mumbai", label: "Mumbai", group: "Major Metro Cities" },
    { value: "Pune", label: "Pune", group: "Major Metro Cities" },
    { value: "Bangalore", label: "Bangalore", group: "Major Metro Cities" },
    { value: "Hyderabad", label: "Hyderabad", group: "Major Metro Cities" },
    { value: "Gwalior", label: "Gwalior (MP)", group: "Transit & Regional Hubs" },
    { value: "Agra", label: "Agra (UP)", group: "Transit & Regional Hubs" },
    { value: "Bhopal", label: "Bhopal (MP)", group: "Transit & Regional Hubs" },
    { value: "Indore", label: "Indore (MP)", group: "Transit & Regional Hubs" }
];

const AIRPORTS = [
    { value: "Gwalior Airport (GWL)", label: "Gwalior Airport (GWL) - Nearest Hub" },
    { value: "Delhi IGI Airport (DEL)", label: "Delhi IGI Airport (DEL) - International Hub" },
    { value: "Bhopal Airport (BHO)", label: "Bhopal Raja Bhoj Airport (BHO)" },
    { value: "Agra Airport (AGR)", label: "Agra Kheria Airport (AGR)" }
];

function populateSelect(selectEl, options, placeholder, isAirport = false) {
    let html = `<option value="" disabled selected>${placeholder}</option>`;
    if (isAirport) {
        options.forEach(opt => {
            html += `<option value="${opt.value}">${opt.label}</option>`;
        });
    } else {
        const groups = {};
        options.forEach(opt => {
            if (!groups[opt.group]) groups[opt.group] = [];
            groups[opt.group].push(opt);
        });
        for (const [groupName, items] of Object.entries(groups)) {
            html += `<optgroup label="${groupName}">`;
            items.forEach(item => {
                html += `<option value="${item.value}">${item.label}</option>`;
            });
            html += `</optgroup>`;
        }
    }
    selectEl.innerHTML = html;
}

function updateDropdownOptions(selectEl, options, placeholder, isAirport = false) {
    const currentValue = selectEl.value;
    populateSelect(selectEl, options, placeholder, isAirport);
    if (currentValue && selectEl.querySelector(`option[value="${currentValue}"]`)) {
        selectEl.value = currentValue;
    }
}

function getRouteDistance(pickup, dropoff) {
    if (!pickup || !dropoff) return 0;
    const key = `${pickup}-${dropoff}`;
    const reverseKey = `${dropoff}-${pickup}`;
    
    if (ROUTE_DISTANCES[key]) return ROUTE_DISTANCES[key];
    if (ROUTE_DISTANCES[reverseKey]) return ROUTE_DISTANCES[reverseKey];
    
    // Deterministic fallback based on character codes if route not in matrix
    let hash = 0;
    const combined = key;
    for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 400) + 120; // returns 120km to 520km
}

function hasNightCharge(startDt, endDt, isMultiDay) {
    if (!startDt) return false;
    
    const startHour = new Date(startDt).getHours();
    
    // Check if start time is between 10 PM and 6 AM
    if (startHour >= 22 || startHour < 6) {
        return true;
    }
    
    // If it's a multi-day trip (daysCount > 1), it spans overnight
    if (isMultiDay) {
        return true;
    }
    
    // If there is an end date, check if the duration covers any night hours
    if (endDt) {
        const endHour = new Date(endDt).getHours();
        if (endHour >= 22 || endHour < 6) {
            return true;
        }
        
        const startDay = new Date(startDt).toDateString();
        const endDay = new Date(endDt).toDateString();
        if (startDay !== endDay) {
            return true;
        }
    }
    
    return false;
}

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
const state = {
    tripType: "outstation", // "outstation", "local", "airport"
    outstationSubtype: "roundtrip", // "roundtrip", "oneway"
    pickupLocation: "",
    dropoffLocation: "",
    localPackage: "8h-80k",
    airportTransferType: "to-airport",
    
    tripStart: "",
    tripEnd: "",
    estimatedDistanceKms: 250,
    daysCount: 1,
    
    selectedCategory: "all",
    currentSort: "recommended",
    activeCar: null,
    
    promoCodeApplied: false,
    promoDiscount: 0,
    checkoutStep: 1,
    
    addons: {
        tollsFastag: true, // Express Toll Fastag Package
        luggageCarrier: false,
        silentJourney: false
    }
};

// ==========================================================================
// INITIALIZATION & EVENT REGISTERING
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initDateTimePickers();
    initTestimonials();
    initFAQs();
    initMobileNav();
    initBookingWidget();
    initFleetFilters();
    initCheckoutFlow();
    initQuoteModal();
    triggerStatsCounter();
});

// ==========================================================================
// GLOBAL UI - MOBILE HEADER & SCROLLS
// ==========================================================================
function initHeaderScroll() {
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function initMobileNav() {
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-active");
        hamburger.classList.toggle("active");
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll("span");
        if (hamburger.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -7px)";
            spans.forEach(s => s.style.backgroundColor = "var(--color-bg-white)");
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
            spans.forEach(s => s.style.backgroundColor = "var(--color-primary)");
        }
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("mobile-active")) {
                hamburger.click();
            }
        });
    });
}

// ==========================================================================
// DYNAMIC STATISTICS COUNTER ANIMATION
// ==========================================================================
function triggerStatsCounter() {
    const targets = {
        "stat-cities": 100,
        "stat-cars": 1200,
        "stat-trips": 45000,
        "stat-years": 20
    };

    const speed = 200; // lower is faster

    const startCounters = () => {
        for (const [id, target] of Object.entries(targets)) {
            const el = document.getElementById(id);
            if (!el) continue;
            
            const updateCount = () => {
                const current = parseInt(el.innerText) || 0;
                const increment = Math.ceil(target / speed);
                
                if (current < target) {
                    el.innerText = current + increment > target ? target : current + increment;
                    setTimeout(updateCount, 15);
                } else {
                    el.innerText = target + "+";
                }
            };
            updateCount();
        }
    };

    // Trigger when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector(".stats-bar");
    if (statsBar) observer.observe(statsBar);
}

// ==========================================================================
// BOOKING WIDGET TABS & INPUT STATES
// ==========================================================================
function initDateTimePickers() {
    const tripStartInput = document.getElementById("trip-start");
    const tripEndInput = document.getElementById("trip-end");

    // Set minimum pick up date-time to now
    const now = new Date();
    const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    tripStartInput.min = localISO;
    
    // Default dates: starts in 3 hours, ends in 3 days
    const defaultStart = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const defaultEnd = new Date(defaultStart.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    tripStartInput.value = new Date(defaultStart.getTime() - defaultStart.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    tripEndInput.value = new Date(defaultEnd.getTime() - defaultEnd.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    tripEndInput.min = tripStartInput.value;

    function handleDateValidation() {
        const startVal = new Date(tripStartInput.value);
        const endVal = new Date(tripEndInput.value);
        
        tripEndInput.min = tripStartInput.value;
        
        if (isNaN(startVal.getTime())) return;
        
        // Calculate days count
        if (state.tripType === "outstation" && state.outstationSubtype === "roundtrip") {
            if (!isNaN(endVal.getTime()) && endVal > startVal) {
                const diffMs = endVal - startVal;
                state.daysCount = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
            } else {
                state.daysCount = 1;
            }
        } else {
            state.daysCount = 1; // local hourly or one-way drop are calculated on 1 day allowance basis
        }
    }

    tripStartInput.addEventListener("change", handleDateValidation);
    tripEndInput.addEventListener("change", handleDateValidation);
    handleDateValidation();
}

function initBookingWidget() {
    const bookingForm = document.getElementById("hero-booking-form");
    const homeView = document.getElementById("home-view");
    const searchView = document.getElementById("search-view");
    const modifySearchBtn = document.getElementById("modify-search-btn");
    const fleetNavLink = document.getElementById("nav-fleet-link");

    // Trip Type Tab Buttons
    const tabOutstation = document.getElementById("tab-outstation");
    const tabLocal = document.getElementById("tab-local");
    const tabAirport = document.getElementById("tab-airport");

    // Form inputs to show/hide
    const outstationSubtoggle = document.getElementById("outstation-subtoggle-group");
    const dropoffGroup = document.getElementById("dropoff-group");
    const dropoffLabel = dropoffGroup.querySelector(".input-label");
    const dropoffSelect = document.getElementById("dropoff-location");
    const localPackageGroup = document.getElementById("local-package-group");
    const airportTripTypeGroup = document.getElementById("airport-trip-type-group");
    const returnDatetimeGroup = document.getElementById("return-datetime-group");

    // Outstation Round-Trip vs One-Way Sub-toggles
    const btnRoundTrip = document.getElementById("btn-roundtrip");
    const btnOneWay = document.getElementById("btn-oneway");

    const pickupSelect = document.getElementById("pickup-location");
    const pickupLabel = document.querySelector('label[for="pickup-location"]');

    function handleAirportDirectionChange() {
        const isToAirport = document.getElementById("airport-transfer-type").value === "to-airport";
        
        if (isToAirport) {
            pickupLabel.innerText = "Pick-up City";
            updateDropdownOptions(pickupSelect, CITIES, "Select City");
            
            dropoffLabel.innerText = "Drop-off Airport Node";
            updateDropdownOptions(dropoffSelect, AIRPORTS, "Select Airport", true);
        } else {
            pickupLabel.innerText = "Pick-up Airport Node";
            updateDropdownOptions(pickupSelect, AIRPORTS, "Select Airport", true);
            
            dropoffLabel.innerText = "Drop-off City";
            updateDropdownOptions(dropoffSelect, CITIES, "Select City");
        }
    }

    function setTripType(type) {
        state.tripType = type;
        
        // Update tab buttons active state
        tabOutstation.classList.toggle("active", type === "outstation");
        tabLocal.classList.toggle("active", type === "local");
        tabAirport.classList.toggle("active", type === "airport");

        if (type === "outstation") {
            outstationSubtoggle.style.display = "flex";
            dropoffGroup.style.display = "flex";
            dropoffLabel.innerText = "Drop-to Destination";
            dropoffSelect.required = true;
            localPackageGroup.style.display = "none";
            airportTripTypeGroup.style.display = "none";
            
            pickupLabel.innerText = "Pick-up From";
            updateDropdownOptions(pickupSelect, CITIES, "Select City / Town");
            updateDropdownOptions(dropoffSelect, CITIES, "Select Destination City");

            if (state.outstationSubtype === "roundtrip") {
                returnDatetimeGroup.style.display = "block";
                document.getElementById("trip-end").required = true;
            } else {
                returnDatetimeGroup.style.display = "none";
                document.getElementById("trip-end").required = false;
            }
        } else if (type === "local") {
            outstationSubtoggle.style.display = "none";
            dropoffGroup.style.display = "none";
            dropoffSelect.required = false;
            localPackageGroup.style.display = "block";
            airportTripTypeGroup.style.display = "none";
            returnDatetimeGroup.style.display = "none";
            document.getElementById("trip-end").required = false;

            pickupLabel.innerText = "Pick-up From";
            updateDropdownOptions(pickupSelect, CITIES, "Select City");
        } else if (type === "airport") {
            outstationSubtoggle.style.display = "none";
            dropoffGroup.style.display = "flex";
            localPackageGroup.style.display = "none";
            airportTripTypeGroup.style.display = "block";
            returnDatetimeGroup.style.display = "none";
            document.getElementById("trip-end").required = false;

            handleAirportDirectionChange();
        }

        // Sync state locations with select values
        state.pickupLocation = pickupSelect.value || "";
        state.dropoffLocation = dropoffSelect.value || "";

        updateEstimatedDistance();
    }

    tabOutstation.addEventListener("click", () => setTripType("outstation"));
    tabLocal.addEventListener("click", () => setTripType("local"));
    tabAirport.addEventListener("click", () => setTripType("airport"));

    // Round-trip vs One-way toggles
    btnRoundTrip.addEventListener("click", () => {
        btnRoundTrip.classList.add("active");
        btnOneWay.classList.remove("active");
        state.outstationSubtype = "roundtrip";
        returnDatetimeGroup.style.display = "block";
        document.getElementById("trip-end").required = true;
        updateEstimatedDistance();
    });

    btnOneWay.addEventListener("click", () => {
        btnOneWay.classList.add("active");
        btnRoundTrip.classList.remove("active");
        state.outstationSubtype = "oneway";
        returnDatetimeGroup.style.display = "none";
        document.getElementById("trip-end").required = false;
        updateEstimatedDistance();
    });

    // Recalculate estimated kms on pick-up or drop-off change
    pickupSelect.addEventListener("change", () => {
        state.pickupLocation = pickupSelect.value;
        updateEstimatedDistance();
    });
    
    dropoffSelect.addEventListener("change", () => {
        state.dropoffLocation = dropoffSelect.value;
        updateEstimatedDistance();
    });

    document.getElementById("airport-transfer-type").addEventListener("change", () => {
        state.airportTransferType = document.getElementById("airport-transfer-type").value;
        handleAirportDirectionChange();
        updateEstimatedDistance();
    });

    function updateEstimatedDistance() {
        const durationIndicator = document.getElementById("duration-indicator");
        const durationText = document.getElementById("duration-text");

        if (state.tripType === "local") {
            durationIndicator.style.display = "flex";
            const pkg = document.getElementById("local-package").value;
            let label = "80 km Package Included";
            if (pkg === "4h-40k") label = "40 km Package Included";
            if (pkg === "12h-120k") label = "120 km Package Included";
            durationText.innerText = label;
            return;
        }

        if (!state.pickupLocation || !state.dropoffLocation) {
            durationIndicator.style.display = "none";
            return;
        }

        let distance = getRouteDistance(state.pickupLocation, state.dropoffLocation);
        
        // Round trip doubles the base route distance
        if (state.tripType === "outstation" && state.outstationSubtype === "roundtrip") {
            distance = distance * 2;
        }

        state.estimatedDistanceKms = distance;
        durationIndicator.style.display = "flex";
        durationText.innerText = `${distance} Kilometers${state.outstationSubtype === 'roundtrip' ? ' (Round-Trip)' : ' (One-Way)'}`;
    }

    document.getElementById("local-package").addEventListener("change", (e) => {
        state.localPackage = e.target.value;
        updateEstimatedDistance();
    });

    // Initialize with default state
    setTripType("outstation");

    // Form Submit Handler (Search Cabs)
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!pickupSelect.value) {
            alert("Please choose a pick-up city.");
            return;
        }

        if (state.tripType !== "local" && !dropoffSelect.value) {
            alert("Please select a drop-off destination or airport.");
            return;
        }

        // Save input date
        state.tripStart = document.getElementById("trip-start").value;
        state.tripEnd = document.getElementById("trip-end").value;

        // Switch View
        homeView.classList.remove("visible");
        homeView.classList.add("hidden");
        searchView.classList.remove("hidden");
        searchView.classList.add("visible");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Update Search Header Titles
        const formatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const displayStart = new Date(state.tripStart).toLocaleDateString('en-IN', formatOptions);
        
        let headerTitle = "";
        let headerDesc = "";
        
        if (state.tripType === "outstation") {
            const isRound = state.outstationSubtype === "roundtrip";
            headerTitle = `Outstation Cabs: ${state.pickupLocation} ⟷ ${state.dropoffLocation}`;
            headerDesc = `${isRound ? 'Round-Trip' : 'One-Way Drop'} • Est. Distance: ${state.estimatedDistanceKms} km • Depart: ${displayStart}`;
        } else if (state.tripType === "local") {
            const pkg = document.getElementById("local-package").value;
            let label = "8h / 80km";
            if (pkg === "4h-40k") label = "4h / 40km";
            if (pkg === "12h-120k") label = "12h / 120km";
            headerTitle = `Local Hourly Hires in ${state.pickupLocation}`;
            headerDesc = `Package: ${label} • Depart: ${displayStart}`;
        } else {
            const isToAirport = document.getElementById("airport-transfer-type").value === "to-airport";
            headerTitle = `Airport Transfers: ${isToAirport ? 'City to Airport' : 'Airport to City'}`;
            headerDesc = `Route: ${state.pickupLocation} ⟷ ${state.dropoffLocation} • Depart: ${displayStart}`;
        }

        document.getElementById("search-city-title").innerText = headerTitle;
        document.getElementById("search-dates-title").innerText = headerDesc;

        // Load Fleet Cabs
        loadFleet();
    });

    // Modify Search click
    modifySearchBtn.addEventListener("click", () => {
        searchView.classList.remove("visible");
        searchView.classList.add("hidden");
        homeView.classList.remove("hidden");
        homeView.classList.add("visible");
        
        setTimeout(() => {
            const widget = document.querySelector(".booking-widget");
            if (widget) {
                widget.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    });

    // Header fleet link programmatic search
    fleetNavLink.addEventListener("click", (e) => {
        if (searchView.classList.contains("hidden")) {
            e.preventDefault();
            
            // Set defaults and search
            if (!pickupSelect.value) {
                pickupSelect.value = "Morena";
                state.pickupLocation = "Morena";
            }
            if (!dropoffSelect.value) {
                dropoffSelect.value = "Delhi NCR";
                state.dropoffLocation = "Delhi NCR";
            }
            
            setTripType("outstation");
            
            // Trigger submit
            bookingForm.dispatchEvent(new Event("submit", { cancelable: true }));
            
            setTimeout(() => {
                const resultsSection = document.getElementById("fleet-category-tabs");
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 200);
        } else {
            e.preventDefault();
            const resultsSection = document.getElementById("fleet-category-tabs");
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });
}

// ==========================================================================
// FLEET FILTERS & RENDERING ENGINE
// ==========================================================================
function initFleetFilters() {
    const categoryTabs = document.getElementById("fleet-category-tabs");
    const tabs = categoryTabs.querySelectorAll(".tab-btn");
    
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            state.selectedCategory = tab.getAttribute("data-category");
            renderFleetResults();
        });
    });

    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", (e) => {
        state.currentSort = e.target.value;
        renderFleetResults();
    });
}

function loadFleet() {
    const loader = document.getElementById("fleet-loader");
    loader.classList.add("active");

    setTimeout(() => {
        loader.classList.remove("active");
        renderFleetResults();
    }, 1000);
}

function renderFleetResults() {
    const fleetGrid = document.getElementById("fleet-results-grid");
    fleetGrid.innerHTML = "";

    // 1. Filter
    let filteredCabs = CAR_FLEET;
    if (state.selectedCategory !== "all") {
        filteredCabs = CAR_FLEET.filter(cab => cab.category === state.selectedCategory);
    }

    // 2. Sort
    if (state.currentSort === "price-low") {
        filteredCabs.sort((a, b) => getCabPriceEstimate(a) - getCabPriceEstimate(b));
    } else if (state.currentSort === "price-high") {
        filteredCabs.sort((a, b) => getCabPriceEstimate(b) - getCabPriceEstimate(a));
    } else if (state.currentSort === "rating") {
        filteredCabs.sort((a, b) => b.rating - a.rating);
    } else {
        // Recommended: Sort Innova/SUVs first for outstation, Sedan for local
        filteredCabs.sort((a, b) => {
            if (state.tripType === "outstation") {
                if (a.category === "mpv" && b.category !== "mpv") return -1;
                if (b.category === "mpv" && a.category !== "mpv") return 1;
            } else if (state.tripType === "local") {
                if (a.category === "sedan" && b.category !== "sedan") return -1;
                if (b.category === "sedan" && a.category !== "sedan") return 1;
            }
            return b.rating - a.rating;
        });
    }

    // 3. Render cards
    if (filteredCabs.length === 0) {
        fleetGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fa-solid fa-car-burst" style="font-size: 3rem; color: var(--color-secondary); margin-bottom: 20px;"></i>
                <h3>No Vehicles Available</h3>
                <p style="color: var(--color-text-muted); margin-top: 10px;">No cabs match this category on this route. Try changing filters or route.</p>
            </div>
        `;
        return;
    }

    filteredCabs.forEach(cab => {
        const estPrice = getCabPriceEstimate(cab);
        
        let rateLabel = "";
        if (state.tripType === "outstation") {
            rateLabel = state.outstationSubtype === "oneway" ? `Fixed Outstation Rate` : `Starting at ₹${cab.perKmRate}/km`;
        } else if (state.tripType === "local") {
            rateLabel = "Fixed Hourly Package";
        } else {
            rateLabel = "Fixed Airport Drop Rate";
        }
        
        const card = document.createElement("div");
        card.className = "car-card";
        
        card.innerHTML = `
            <div class="car-card-img-wrapper">
                <span class="badge badge-accent car-card-badge"><i class="fa-solid fa-user-tie"></i> Chauffeur Included</span>
                <img src="${cab.image}" alt="${cab.name}" class="car-card-img" width="280" height="180" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\\'http://www.w3.org/2000/svg\\\' width=\\\'280\\\' height=\\\'180\\\' viewBox=\\\'0 0 280 180\\\' style=\\\'background:%23e2e8f0;\\\'><text x=\\\'50%\\\' y=\\\'50%\\\' dominant-baseline=\\\'middle\\\' text-anchor=\\\'middle\\\' font-family=\\\'sans-serif\\\' font-size=\\\'16\\\' fill=\\\'%2364748b\\\' >${cab.name}</text></svg>'">
                <div class="car-card-distance"><i class="fa-solid fa-star" style="color:var(--color-gold);"></i> ${cab.rating} (${cab.trips} trips)</div>
            </div>
            
            <div class="car-card-content">
                <div class="car-card-header">
                    <div>
                        <h3 class="car-card-name">${cab.name}</h3>
                        <span class="car-card-category">${cab.category} • ${rateLabel}</span>
                    </div>
                </div>
                
                <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px; min-height: 40px; line-height:1.4;">
                    ${cab.description}
                </p>
                
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; background-color: var(--color-bg-light); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                    <i class="fa-solid fa-user-tie" style="color: var(--color-accent); font-size: 1rem;"></i>
                    <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary-light);">
                        Chauffeur: <span style="font-weight: 600; color: var(--color-text-muted);">${cab.chauffeur}</span>
                    </div>
                </div>
                
                <div class="car-card-specs" style="margin-bottom: 20px;">
                    <div class="spec-item">
                        <i class="fa-solid fa-users"></i>
                        <span class="spec-label">${cab.seats} Passengers</span>
                    </div>
                    <div class="spec-item">
                        <i class="fa-solid fa-briefcase"></i>
                        <span class="spec-label">${cab.luggage} Capacity</span>
                    </div>
                </div>
                
                <div class="car-card-footer">
                    <div class="car-card-price">
                        <span class="price-value">₹${estPrice.toLocaleString('en-IN')}</span>
                        <span class="price-unit">Est. Total (incl. GST)</span>
                    </div>
                    <button class="btn btn-primary btn-sm book-now-btn" data-id="${cab.id}">Book Taxi</button>
                </div>
            </div>
        `;
        
        fleetGrid.appendChild(card);
    });

    // Wire booking buttons
    const bookBtns = fleetGrid.querySelectorAll(".book-now-btn");
    bookBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const cabId = btn.getAttribute("data-id");
            openCheckout(cabId);
        });
    });
}

function getCabPriceEstimate(cab) {
    if (state.tripType === "local") {
        const pkg = state.localPackage;
        const baseRate = cab.localPackageRates[pkg] || cab.localPackageRates["8h-80k"];
        // Add 5% GST
        return Math.round(baseRate * 1.05);
    }
    
    if (state.tripType === "airport") {
        const baseRate = cab.airportFlatRate;
        const tollCharge = 200; // Airport terminal tolls
        const taxableSubtotal = baseRate + tollCharge;
        const gst = Math.round(taxableSubtotal * 0.05);
        return taxableSubtotal + gst;
    }
    
    // Outstation pricing
    const baseRental = state.estimatedDistanceKms * cab.perKmRate;
    const driverAllowance = state.daysCount * 300;
    
    let tollCharge = 200;
    const isDelhiAgra = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Agra")) || 
                        (state.pickupLocation.includes("Agra") && state.dropoffLocation.includes("Delhi"));
    const isDelhiMorena = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Morena")) ||
                          (state.pickupLocation.includes("Morena") && state.dropoffLocation.includes("Delhi"));
    if (isDelhiAgra) {
        tollCharge = 450;
    } else if (isDelhiMorena) {
        tollCharge = 650;
    }
    
    let nightCharge = 0;
    const isMultiDay = state.tripType === "outstation" && state.outstationSubtype === "roundtrip" && state.daysCount > 1;
    if (hasNightCharge(state.tripStart, state.tripEnd, isMultiDay)) {
        nightCharge = 250;
    }
    
    const taxableSubtotal = baseRental + driverAllowance + tollCharge + nightCharge;
    const gst = Math.round(taxableSubtotal * 0.05);
    
    return taxableSubtotal + gst;
}

// ==========================================================================
// CHECKOUT MODAL FLOW LOGIC
// ==========================================================================
function initCheckoutFlow() {
    const modal = document.getElementById("checkout-modal");
    const overlay = document.getElementById("checkout-overlay");
    const closeBtn = document.getElementById("checkout-close-btn");
    const nextBtn = document.getElementById("checkout-next-btn");
    const prevBtn = document.getElementById("checkout-prev-btn");
    const successHomeBtn = document.getElementById("success-home-btn");

    const closeModal = () => {
        modal.classList.remove("active");
        document.getElementById("checkout-grid-container").style.display = "grid";
        document.getElementById("checkout-success-view").style.display = "none";
        document.querySelector(".checkout-steps").style.display = "flex";
        state.checkoutStep = 1;
        state.promoCodeApplied = false;
        state.promoDiscount = 0;
        state.addons.luggageCarrier = false;
        state.addons.silentJourney = false;
        document.getElementById("promo-code").value = "";
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    successHomeBtn.addEventListener("click", () => {
        closeModal();
        document.getElementById("modify-search-btn").click();
    });

    // Custom addons selections
    const addonTolls = document.getElementById("addon-protection");
    const addonCarrier = document.getElementById("addon-km");
    const addonSilent = document.getElementById("addon-gps");

    addonTolls.addEventListener("click", () => {
        addonTolls.classList.toggle("active");
        state.addons.tollsFastag = addonTolls.classList.contains("active");
        updateBillDetails();
    });

    addonCarrier.addEventListener("click", () => {
        addonCarrier.classList.toggle("active");
        state.addons.luggageCarrier = addonCarrier.classList.contains("active");
        updateBillDetails();
    });

    addonSilent.addEventListener("click", () => {
        addonSilent.classList.toggle("active");
        state.addons.silentJourney = addonSilent.classList.contains("active");
        updateBillDetails();
    });

    // Promo Code
    const promoApplyBtn = document.getElementById("promo-apply-btn");
    promoApplyBtn.addEventListener("click", () => {
        const codeInput = document.getElementById("promo-code").value.trim().toUpperCase();
        if (codeInput === "MORENA20" || codeInput === "CHAMBAL50") {
            state.promoCodeApplied = true;
            state.promoDiscount = 500;
            alert("Promo Code Applied! Discount of ₹500 has been deducted from your base fare.");
            updateBillDetails();
        } else if (codeInput === "") {
            alert("Please enter a coupon code.");
        } else {
            alert("Invalid Promo Code. Use 'MORENA20' for ₹500 off.");
        }
    });

    // Payment Methods toggler
    const payBtns = document.querySelectorAll(".pay-method-btn");
    const cardInputs = document.getElementById("card-form-inputs");
    const upiInputs = document.getElementById("upi-form-inputs");
    const callbackInfo = document.getElementById("callback-info-box");

    payBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            payBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const method = btn.getAttribute("data-method");
            if (method === "card") {
                cardInputs.style.display = "grid";
                upiInputs.style.display = "none";
                callbackInfo.style.display = "none";
            } else if (method === "upi") {
                cardInputs.style.display = "none";
                upiInputs.style.display = "grid";
                callbackInfo.style.display = "none";
            } else if (method === "callback") {
                cardInputs.style.display = "none";
                upiInputs.style.display = "none";
                callbackInfo.style.display = "block";
            }
        });
    });

    // Next/Prev Buttons Step flow
    nextBtn.addEventListener("click", () => {
        if (state.checkoutStep === 1) {
            goToStep(2);
        } else if (state.checkoutStep === 2) {
            // Validate passenger details
            const pName = document.getElementById("passenger-name").value.trim();
            const pPhone = document.getElementById("passenger-phone").value.trim();
            if (!pName || pPhone.length < 10) {
                alert("Please enter a valid Lead Passenger Name and 10-digit mobile number.");
                return;
            }
            goToStep(3);
        } else if (state.checkoutStep === 3) {
            // Validate payment method inputs if not callback mode
            const activeMethod = document.querySelector(".pay-method-btn.active").getAttribute("data-method");
            if (activeMethod === "card") {
                const cardNum = document.getElementById("card-number").value.trim();
                const cardExp = document.getElementById("card-expiry").value.trim();
                const cardCvv = document.getElementById("card-cvv").value.trim();
                if (cardNum.length < 15 || cardExp.length < 5 || cardCvv.length < 3) {
                    alert("Please enter valid Credit/Debit card details.");
                    return;
                }
            } else if (activeMethod === "upi") {
                const upiVpa = document.getElementById("upi-vpa").value.trim();
                if (!upiVpa.includes("@")) {
                    alert("Please enter a valid UPI address (e.g. name@upi).");
                    return;
                }
            }
            
            processFinalBooking();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (state.checkoutStep > 1) {
            goToStep(state.checkoutStep - 1);
        }
    });
}

function openCheckout(cabId) {
    const cab = CAR_FLEET.find(c => c.id === cabId);
    if (!cab) return;
    
    state.activeCar = cab;
    state.checkoutStep = 1;
    
    // Set Sidebar elements
    document.getElementById("summary-car-image").src = cab.image;
    document.getElementById("summary-car-name").innerText = cab.name;
    document.getElementById("summary-car-meta").innerText = `${cab.luggage} • ${cab.seats} Seats • Chauffeur Included`;
    document.getElementById("summary-location-text").innerText = state.pickupLocation;
    
    const dropoffRow = document.getElementById("summary-dropoff-text");
    const returnRow = document.getElementById("summary-return-row");
    
    if (state.tripType === "local") {
        dropoffRow.innerText = "Local Sightseeing / Corporate Run";
        returnRow.style.display = "none";
    } else {
        dropoffRow.innerText = state.dropoffLocation;
        if (state.tripType === "outstation" && state.outstationSubtype === "roundtrip") {
            returnRow.style.display = "block";
            const formatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            document.getElementById("summary-return-time").innerText = new Date(state.tripEnd).toLocaleDateString('en-IN', formatOptions);
        } else {
            returnRow.style.display = "none";
        }
    }

    const formatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById("summary-pickup-time").innerText = new Date(state.tripStart).toLocaleDateString('en-IN', formatOptions);

    // Reset Form checkboxes
    const addonTolls = document.getElementById("addon-protection");
    const addonCarrier = document.getElementById("addon-km");
    const addonSilent = document.getElementById("addon-gps");

    addonTolls.classList.add("active");
    addonCarrier.classList.remove("active");
    addonSilent.classList.remove("active");

    state.addons.tollsFastag = true;
    state.addons.luggageCarrier = false;
    state.addons.silentJourney = false;

    // Reset inputs
    document.getElementById("passenger-name").value = "";
    document.getElementById("passenger-phone").value = "";
    document.getElementById("passenger-email").value = "";
    document.getElementById("passenger-notes").value = "";
    document.getElementById("card-number").value = "";
    document.getElementById("card-expiry").value = "";
    document.getElementById("card-cvv").value = "";
    document.getElementById("upi-vpa").value = "";
    document.getElementById("promo-code").value = "";

    // Show step 1
    goToStep(1);
    
    // Update Billing Breakdown
    updateBillDetails();

    // Trigger Modal
    document.getElementById("checkout-modal").classList.add("active");
}

function goToStep(step) {
    state.checkoutStep = step;
    
    document.getElementById("step-nav-1").className = `checkout-step ${step > 1 ? 'completed' : (step === 1 ? 'active' : '')}`;
    document.getElementById("step-nav-2").className = `checkout-step ${step > 2 ? 'completed' : (step === 2 ? 'active' : '')}`;
    document.getElementById("step-nav-3").className = `checkout-step ${step === 3 ? 'active' : ''}`;
    
    document.getElementById("checkout-pane-1").classList.toggle("active", step === 1);
    document.getElementById("checkout-pane-2").classList.toggle("active", step === 2);
    document.getElementById("checkout-pane-3").classList.toggle("active", step === 3);

    const prevBtn = document.getElementById("checkout-prev-btn");
    const nextBtn = document.getElementById("checkout-next-btn");

    prevBtn.style.display = step === 1 ? "none" : "block";
    nextBtn.innerText = step === 3 ? "Confirm Booking" : "Next Step";
}

function updateBillDetails() {
    if (!state.activeCar) return;

    const cab = state.activeCar;
    
    let baseRental = 0;
    let driverAllowance = 0;
    let tollCharge = 0;
    let nightCharge = 0;
    
    // Label updates
    const distLabel = document.getElementById("summary-distance-kms");
    const baseLabel = document.querySelector(".bill-details .bill-row:first-child span");
    const tollLabel = document.querySelector("#bill-delivery-row span:first-child");
    const allowanceLabel = document.querySelector("#bill-insurance-row span:first-child");
    
    if (state.tripType === "local") {
        const pkg = state.localPackage;
        baseRental = cab.localPackageRates[pkg] || cab.localPackageRates["8h-80k"];
        
        let label = "8 hrs / 80 kms Package";
        if (pkg === "4h-40k") label = "4 hrs / 40 kms Package";
        if (pkg === "12h-120k") label = "12 hrs / 120 kms Package";
        
        baseLabel.innerText = `Local Hourly Hire (${label})`;
        distLabel.innerText = "Hourly Usage";
        allowanceLabel.innerText = "Driver Allowance (Included)";
        driverAllowance = 0;
        tollLabel.innerText = "Local Parking & Fuel Charge";
        tollCharge = 0; // included in hourly package
    } else if (state.tripType === "airport") {
        baseRental = cab.airportFlatRate;
        baseLabel.innerText = `Airport Flat Transfer Fee`;
        distLabel.innerText = "Airport Ride";
        allowanceLabel.innerText = "Driver Allowance (Included)";
        driverAllowance = 0;
        tollLabel.innerText = "Airport Terminal Tolls";
        tollCharge = 200; // Airport toll estimation
    } else {
        // Outstation
        baseRental = state.estimatedDistanceKms * cab.perKmRate;
        baseLabel.innerText = `Base Route Fare (${state.estimatedDistanceKms} kms)`;
        distLabel.innerText = `${state.estimatedDistanceKms} kms`;
        
        driverAllowance = state.daysCount * 300;
        allowanceLabel.innerText = `Driver Allowance (${state.daysCount} Day${state.daysCount > 1 ? 's' : ''})`;
        
        tollLabel.innerText = "Estimated Highway Tolls";
        if (state.addons.tollsFastag) {
            const isDelhiAgra = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Agra")) || 
                                (state.pickupLocation.includes("Agra") && state.dropoffLocation.includes("Delhi"));
            const isDelhiMorena = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Morena")) ||
                                  (state.pickupLocation.includes("Morena") && state.dropoffLocation.includes("Delhi"));
            if (isDelhiAgra) {
                tollCharge = 450;
            } else if (isDelhiMorena) {
                tollCharge = 650;
            } else {
                tollCharge = 200;
            }
        } else {
            tollCharge = 0; // Guest pays tolls physically
        }
    }

    // Night charge calculation
    const isMultiDay = state.tripType === "outstation" && state.outstationSubtype === "roundtrip" && state.daysCount > 1;
    if (hasNightCharge(state.tripStart, state.tripEnd, isMultiDay)) {
        nightCharge = 250;
    }

    // Addons calculation
    let addonsPrice = 0;
    if (state.addons.luggageCarrier) {
        addonsPrice += (199 * state.daysCount); // Overhead carrier
    }
    
    // Subtotal taxable (Base Rental + Driver Allowance + Tolls + Addons + Night Charge)
    const taxableSubtotal = baseRental + driverAllowance + tollCharge + addonsPrice + nightCharge;
    
    // GST (5% for taxi passenger transport services in India)
    const gst = Math.round(taxableSubtotal * 0.05);
    
    let totalFare = taxableSubtotal + gst;
    if (state.promoCodeApplied) {
        totalFare = Math.max(0, totalFare - state.promoDiscount);
    }

    // Update UI bills
    document.getElementById("bill-base-price").innerText = `₹${baseRental.toLocaleString('en-IN')}`;
    
    // Tolls row
    const delPriceEl = document.getElementById("bill-delivery-price");
    if (tollCharge > 0 || state.tripType === "local") {
        document.getElementById("bill-delivery-row").style.display = "flex";
        delPriceEl.innerText = tollCharge > 0 ? `₹${tollCharge}` : "Included";
    } else {
        document.getElementById("bill-delivery-row").style.display = "none";
    }

    // Driver Allowance row
    const allowancePriceEl = document.getElementById("bill-insurance-price");
    allowancePriceEl.innerText = driverAllowance > 0 ? `₹${driverAllowance}` : "Included";

    // Night Charge row
    const nightRow = document.getElementById("bill-night-row");
    if (nightRow) {
        if (nightCharge > 0) {
            nightRow.style.display = "flex";
            document.getElementById("bill-night-price").innerText = `₹${nightCharge}`;
        } else {
            nightRow.style.display = "none";
        }
    }

    // Addons row
    const addonsRow = document.getElementById("bill-addons-row");
    if (addonsPrice > 0) {
        addonsRow.style.display = "flex";
        document.getElementById("bill-addons-price").innerText = `₹${addonsPrice.toLocaleString('en-IN')}`;
    } else {
        addonsRow.style.display = "none";
    }

    // Taxes & Grand Total
    document.getElementById("bill-tax-price").innerText = `₹${gst.toLocaleString('en-IN')}`;
    
    const discRow = document.getElementById("bill-discount-row");
    if (state.promoCodeApplied) {
        discRow.style.display = "flex";
        document.getElementById("bill-discount-price").innerText = `-₹${state.promoDiscount}`;
    } else {
        discRow.style.display = "none";
    }

    document.getElementById("bill-total-price").innerText = `₹${totalFare.toLocaleString('en-IN')}`;
}

function processFinalBooking() {
    const modalContainer = document.getElementById("checkout-grid-container");
    const successView = document.getElementById("checkout-success-view");
    const stepsHeader = document.querySelector(".checkout-steps");
    const cab = state.activeCar;

    // Calculate total paid
    let baseRental = 0;
    let driverAllowance = 0;
    let tollCharge = 0;
    let nightCharge = 0;
    
    if (state.tripType === "local") {
        baseRental = cab.localPackageRates[state.localPackage] || cab.localPackageRates["8h-80k"];
    } else if (state.tripType === "airport") {
        baseRental = cab.airportFlatRate;
        tollCharge = 200;
    } else {
        baseRental = state.estimatedDistanceKms * cab.perKmRate;
        driverAllowance = state.daysCount * 300;
        if (state.addons.tollsFastag) {
            const isDelhiAgra = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Agra")) || 
                                (state.pickupLocation.includes("Agra") && state.dropoffLocation.includes("Delhi"));
            const isDelhiMorena = (state.pickupLocation.includes("Delhi") && state.dropoffLocation.includes("Morena")) ||
                                  (state.pickupLocation.includes("Morena") && state.dropoffLocation.includes("Delhi"));
            if (isDelhiAgra) {
                tollCharge = 450;
            } else if (isDelhiMorena) {
                tollCharge = 650;
            } else {
                tollCharge = 200;
            }
        }
    }

    const isMultiDay = state.tripType === "outstation" && state.outstationSubtype === "roundtrip" && state.daysCount > 1;
    if (hasNightCharge(state.tripStart, state.tripEnd, isMultiDay)) {
        nightCharge = 250;
    }

    let addonsPrice = state.addons.luggageCarrier ? (199 * state.daysCount) : 0;
    const taxableSubtotal = baseRental + driverAllowance + tollCharge + addonsPrice + nightCharge;
    const gst = Math.round(taxableSubtotal * 0.05);
    let totalFare = taxableSubtotal + gst;
    if (state.promoCodeApplied) {
        totalFare = Math.max(0, totalFare - state.promoDiscount);
    }

    // Success Screen Receipt Updates
    document.getElementById("receipt-car-name").innerText = cab.name;
    
    let routeDisplay = "";
    if (state.tripType === "local") {
        routeDisplay = `Local Hire in ${state.pickupLocation} (${state.localPackage})`;
    } else if (state.tripType === "airport") {
        routeDisplay = `Airport Transfer: ${state.pickupLocation} ⟷ ${state.dropoffLocation}`;
    } else {
        routeDisplay = `${state.pickupLocation} to ${state.dropoffLocation} (${state.outstationSubtype === 'roundtrip' ? 'Round-Trip' : 'One-Way'})`;
    }
    
    document.getElementById("receipt-delivery-mode").innerText = routeDisplay;
    document.getElementById("receipt-total-paid").innerText = `₹${totalFare.toLocaleString('en-IN')}`;

    // Animate view transition
    modalContainer.style.display = "none";
    stepsHeader.style.display = "none";
    successView.style.display = "block";
}

// ==========================================================================
// TESTIMONIALS SLIDER CAROUSEL LOGIC
// ==========================================================================
function initTestimonials() {
    const wrapper = document.getElementById("testimonials-wrapper");
    const slides = wrapper.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.getElementById("slider-dots");
    const prevBtn = document.getElementById("prev-testimonial");
    const nextBtn = document.getElementById("next-testimonial");

    let activeIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    dotsContainer.innerHTML = "";
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement("span");
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".dot");

    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        activeIndex = index;
        wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
        
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === activeIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        goToSlide(activeIndex - 1);
        resetAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
        goToSlide(activeIndex + 1);
        resetAutoPlay();
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(activeIndex + 1);
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();
}

// ==========================================================================
// FAQ ACCORDIONS LOGIC
// ==========================================================================
function initFAQs() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const header = item.querySelector(".faq-header");
        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            faqItems.forEach(f => f.classList.remove("active"));
            
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

// ==========================================================================
// CUSTOM QUOTE MODAL LOGIC
// ==========================================================================
function initQuoteModal() {
    const quoteModal = document.getElementById("quote-modal");
    const quoteOverlay = document.getElementById("quote-overlay");
    const quoteCloseBtn = document.getElementById("quote-close-btn");
    const quoteForm = document.getElementById("quote-form");

    const openQuoteModal = () => {
        quoteModal.classList.add("active");
    };

    const closeQuoteModal = () => {
        quoteModal.classList.remove("active");
        quoteForm.reset();
    };

    quoteCloseBtn.addEventListener("click", closeQuoteModal);
    quoteOverlay.addEventListener("click", closeQuoteModal);

    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const guestName = document.getElementById("quote-name").value;
        alert(`Thank you, ${guestName}! Your custom quote request has been received. Our Morena HQ support desk will email/call you within 30 minutes with an itinerary cost proposal.`);
        closeQuoteModal();
    });
}

// Host program elements are stubbed out to prevent errors if elements aren't loaded
function initHostCalculator() {}
