const RATE = 0.915;
const toSGD = (aud) => (aud * RATE).toFixed(0);

const DAYS = [
{
  num: 1, date: "Mon, 25 May", title: "Arrival Day", theme: "Welcome to Melbourne",
  weather: { high: 15, low: 9, icon: "⛅", desc: "Partly Cloudy, Breezy" },
  activities: [
    {
      time: "02:30", end: "11:45", title: "Scoot TR58: Singapore → Melbourne",
      type: "transport",
      desc: "Depart Singapore Changi Terminal 1 at 02:30. Boeing 787-9, 7h15m flight. Arrive Melbourne Tullamarine Terminal 2 at 11:45 local time. Budget food on Scoot is not included -pre-book meals on the Scoot app or eat at Changi before boarding.",
      atmosphere: [],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Scoot_Boeing_787_on_finals_at_Singapore_Changi_Airport.jpg/960px-Scoot_Boeing_787_on_finals_at_Singapore_Changi_Airport.jpg",
      map: "https://maps.google.com/?q=Melbourne+Airport+Tullamarine",
      cost: { aud: 0, note: "Pre-booked" },
      transport: []
    },
    {
      time: "12:15", title: "Clear Immigration & Collect Luggage",
      type: "transport",
      desc: "Melbourne immigration is generally fast for Singapore passports (ETA pre-approved). Allow 30 min for queue + luggage carousel at T2. Free WiFi at MEL airport -connect immediately to request your ride.",
      atmosphere: ["busy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Melbourne_Airport_International_Terminal2.JPG/960px-Melbourne_Airport_International_Terminal2.JPG",
      map: "https://maps.google.com/?q=Melbourne+Airport+Terminal+2",
      cost: { aud: 0 },
      transport: [
        { mode: "Uber/DiDi", cost: "A$45-55", time: "30-40 min", note: "Best value for 2 pax. Request from T2 rideshare zone." },
        { mode: "SkyBus", cost: "A$49.80 (2 pax)", time: "30 min", note: "To Southern Cross Station, then walk or tram to hotel." },
        { mode: "Taxi", cost: "A$60-75", time: "30-40 min", note: "Metered. Airport surcharge A$4.78." }
      ]
    },
    {
      time: "13:15", title: "Arrive CBD & Check In",
      type: "transport",
      desc: "Head to your apartment. Collins House Apartments by CLLIX is at 464 Collins Street -right in the CBD, 5-min walk from Flinders Street Station. Check-in from 2:00 PM. If early, store bags at reception and explore.",
      atmosphere: [],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Melbourne_CBD-CollinsSt_East.jpg/960px-Melbourne_CBD-CollinsSt_East.jpg",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 200, note: "~A$200-350/night for 1BR apartment" },
      booking: "https://www.cllix.com/collins-house-apartments/",
      transport: []
    },
    {
      time: "14:30", title: "Lunch at Degraves Street",
      type: "food",
      desc: "Melbourne's most famous laneway café strip. Cobblestoned, narrow, lined with tiny espresso bars, cafés, and bakeries. Grab a flat white and a toastie or eggs benedict. Try Degraves Espresso Bar or Journal Café. This is Melbourne coffee culture distilled.",
      atmosphere: ["artsy", "touristy", "foodie"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Degraves_Street_in_Melbourne_Australia.jpg/960px-Degraves_Street_in_Melbourne_Australia.jpg",
      map: "https://maps.google.com/?q=Degraves+Street+Melbourne",
      cost: { aud: 25, note: "A$20-30 pp for coffee + meal" },
      transport: [
        { mode: "Walk", cost: "Free", time: "8 min from Collins House", note: "" }
      ]
    },
    {
      time: "15:30", title: "Flinders Street Station",
      type: "culture",
      desc: "Melbourne's most iconic building. The butter-yellow Edwardian Baroque facade with its famous row of clocks is THE image of Melbourne. Best photographed from the steps of Federation Square across the street. Stunning at dusk when the facade is illuminated. The station is fully operational -35+ million passengers annually.",
      atmosphere: ["historic", "busy", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flinders_Street_Station_Main_Building%2C_May_2019.jpg/960px-Flinders_Street_Station_Main_Building%2C_May_2019.jpg",
      map: "https://maps.google.com/?q=Flinders+Street+Station+Melbourne",
      cost: { aud: 0, note: "Free to visit" },
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from Degraves St", note: "" }
      ]
    },
    {
      time: "16:00", title: "Federation Square & ACMI",
      type: "culture",
      desc: "Melbourne's cultural heart. Striking postmodern architecture of glass, zinc, and sandstone shards. Home to ACMI (Australian Centre for the Moving Image, free entry), The Ian Potter Centre: NGV Australia (free), and Koorie Heritage Trust. Buskers, pop-up markets, and the big screen showing live sports. The plaza buzzes with energy year-round.",
      atmosphere: ["artsy", "touristy", "multicultural", "busy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Federation_Square%2C_Melbourne.jpg/960px-Federation_Square%2C_Melbourne.jpg",
      map: "https://maps.google.com/?q=Federation+Square+Melbourne",
      cost: { aud: 0, note: "Free (ACMI + Ian Potter Centre)" },
      booking: "https://www.acmi.net.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "1 min from Flinders St Station", note: "Directly opposite" }
      ]
    },
    {
      time: "17:00", title: "Hosier Lane Street Art",
      type: "culture",
      desc: "A narrow cobblestone laneway completely blanketed in street art, graffiti, murals, and paste-ups. The art changes constantly -new pieces appear daily. Look for Matt Adnate's towering 23-metre portrait of an Indigenous boy on McDonald House. The lane smells of spray paint and hums with photographers. Also explore nearby AC/DC Lane.",
      atmosphere: ["artsy", "bohemian", "grungy", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Hosier_Lane%2C_Melbourne%2C_Victoria%2C_Australia.JPG/960px-Hosier_Lane%2C_Melbourne%2C_Victoria%2C_Australia.JPG",
      map: "https://maps.google.com/?q=Hosier+Lane+Melbourne",
      cost: { aud: 0, note: "Free" },
      transport: [
        { mode: "Walk", cost: "Free", time: "1 min from Fed Square", note: "" }
      ]
    },
    {
      time: "17:30", title: "Southbank Promenade Sunset Walk",
      type: "culture",
      desc: "Stroll along the Yarra River from Princes Bridge toward the Arts Centre Melbourne spire. The promenade is lined with restaurants, bars, and public art. At dusk, the city skyline reflects in the river. Fire pillars on the Crown Casino side erupt hourly after dark. Atmospheric, romantic, and quintessentially Melbourne.",
      atmosphere: ["romantic", "scenic", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Melbourne_At_Night_from_Southbank_Bridge.JPG/960px-Melbourne_At_Night_from_Southbank_Bridge.JPG",
      map: "https://maps.google.com/?q=Southbank+Promenade+Melbourne",
      cost: { aud: 0, note: "Free" },
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from Hosier Lane", note: "Cross Princes Bridge" }
      ]
    },
    {
      time: "18:30", title: "Dinner at Chin Chin",
      type: "food",
      desc: "Southeast Asian-inspired restaurant on Flinders Lane. Bold, punchy flavours -pad see ew, green papaya salad, whole roasted cauliflower, betel leaf wraps. No reservations taken, walk-in only. Expect a 20-40 min wait (grab a drink at GoGo Bar upstairs while waiting). Always buzzing, loud, energetic. A Melbourne institution.",
      atmosphere: ["busy", "foodie", "multicultural"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/FlindersLane-shopfront.jpg/960px-FlindersLane-shopfront.jpg",
      map: "https://maps.google.com/?q=Chin+Chin+Melbourne+Flinders+Lane",
      cost: { aud: 50, note: "A$40-60 pp with drinks" },
      booking: "https://www.chinchinrestaurant.com.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "10 min from Southbank", note: "" }
      ]
    },
    {
      time: "20:00", title: "Return to Hotel & Rest",
      type: "transport",
      desc: "Walk back to Collins House (10 min). Rest and recover from the red-eye flight. Set your alarm for an early market morning tomorrow.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 0 },
      transport: []
    }
  ],
  dayCost: { transport: 50, food: 75, activities: 0, accommodation: 250 }
},
{
  num: 2, date: "Tue, 26 May", title: "Melbourne Culture & Markets", theme: "Queen Vic, Chinatown, NGV & Botanic Gardens",
  weather: { high: 15, low: 8, icon: "☁️", desc: "Overcast, Cool" },
  activities: [
    {
      time: "08:30", title: "Breakfast at Hotel",
      type: "food",
      desc: "Self-catering in your fully equipped apartment kitchen. The Woolworths Metro on Collins Street (5 min walk) stocks everything you need. Or grab a takeaway flat white and pastry from Patricia Coffee Brewers on Little Bourke Street.",
      atmosphere: ["relaxed"],
      img: "",
      map: "https://maps.google.com/?q=Patricia+Coffee+Brewers+Melbourne",
      cost: { aud: 15, note: "A$10-20 pp" },
      transport: []
    },
    {
      time: "09:30", title: "Queen Victoria Market",
      type: "food",
      desc: "Melbourne's 145-year-old market. Seven hectares of fresh produce, gourmet food, clothing, and souvenirs. The Meat & Fish Hall has sashimi-grade yellowfin, Coffin Bay oysters, live mud crabs. Dairy Hall stocks 50+ Australian artisan cheeses. Must-eat: American Doughnut Kitchen (jam doughnuts since the 1950s), The Bund (Shanghai dumplings), boreks (pan-fried flatbread). Open Tue/Thu/Fri/Sat/Sun.",
      atmosphere: ["busy", "multicultural", "foodie", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Melbourne_%28AU%29%2C_Queen_Victoria_Market_--_2019_--_1542.jpg/960px-Melbourne_%28AU%29%2C_Queen_Victoria_Market_--_2019_--_1542.jpg",
      map: "https://maps.google.com/?q=Queen+Victoria+Market+Melbourne",
      cost: { aud: 20, note: "A$15-30 for tastings & snacks" },
      booking: "https://qvm.com.au/",
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "8 min", note: "Any tram on Elizabeth St, Free Tram Zone" },
        { mode: "Walk", cost: "Free", time: "15 min from Collins House", note: "" }
      ]
    },
    {
      time: "11:00", title: "State Library of Victoria",
      type: "culture",
      desc: "One of the world's most beautiful libraries. The La Trobe Reading Room is a breathtaking octagonal domed space flooded with natural light. Free entry. Small exhibitions rotate. The front lawn is a favourite local hangout. Founded 1854 -one of Australia's oldest cultural institutions.",
      atmosphere: ["quiet", "historic", "artsy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/State_Library_of_Victoria_La_Trobe_Reading_room_5th_floor_view.jpg/960px-State_Library_of_Victoria_La_Trobe_Reading_room_5th_floor_view.jpg",
      map: "https://maps.google.com/?q=State+Library+of+Victoria+Melbourne",
      cost: { aud: 0, note: "Free" },
      transport: [
        { mode: "Walk", cost: "Free", time: "8 min from QVM", note: "" }
      ]
    },
    {
      time: "11:45", title: "Chinatown Melbourne",
      type: "culture",
      desc: "The oldest continuous Chinese settlement outside Asia, established 1850s during the Gold Rush. Walk under the ornate guardian archways on Little Bourke Street. Herbal medicine shops, bubble tea stalls, roast duck hanging in windows, neon signs. At night it transforms into a late-night dumpling and noodle paradise. Also home to secret jazz bars and speakeasies.",
      atmosphere: ["multicultural", "busy", "foodie", "historic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Melbourne_Chinatown_Gateway.jpg/960px-Melbourne_Chinatown_Gateway.jpg",
      map: "https://maps.google.com/?q=Chinatown+Melbourne+Little+Bourke+Street",
      cost: { aud: 0, note: "Free to explore" },
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from State Library", note: "" }
      ]
    },
    {
      time: "12:30", title: "Lunch at HuTong Dumpling Bar",
      type: "food",
      desc: "Legendary xiao long bao in the heart of Chinatown. Hand-folded soup dumplings, pan-fried pork buns, and dan dan noodles. Small, crowded space with communal tables -the food is worth the squeeze. Often has a queue at peak lunch. Alternative: Flower Drum for upscale Cantonese (booking essential, A$100+ pp).",
      atmosphere: ["busy", "foodie", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Xiao_Long_Bao_dumplings.jpg/960px-Xiao_Long_Bao_dumplings.jpg",
      map: "https://maps.google.com/?q=HuTong+Dumpling+Bar+Melbourne",
      cost: { aud: 30, note: "A$25-40 pp" },
      transport: [
        { mode: "Walk", cost: "Free", time: "2 min", note: "On Market Lane, Chinatown" }
      ]
    },
    {
      time: "14:00", title: "NGV International (National Gallery of Victoria)",
      type: "culture",
      desc: "Australia's oldest and most visited art gallery. The permanent collection is FREE and world-class: European Old Masters, Asian art, photography, Australian art. The water wall entrance is iconic. Allow 2-3 hours. Check for paid special exhibitions. The CARTIER: Melbourne Winter Masterpieces show opens June 12 -just after your trip.",
      atmosphere: ["quiet", "artsy", "upscale"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Melbourne_National_Gallery_of_Victoria_Main_facade_seen_in_front.jpg/960px-Melbourne_National_Gallery_of_Victoria_Main_facade_seen_in_front.jpg",
      map: "https://maps.google.com/?q=NGV+International+180+St+Kilda+Road+Melbourne",
      cost: { aud: 0, note: "Free (permanent collection)" },
      booking: "https://www.ngv.vic.gov.au/",
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "12 min", note: "Any tram on St Kilda Rd from Flinders St" },
        { mode: "Uber", cost: "A$10-15", time: "5 min", note: "" }
      ]
    },
    {
      time: "16:30", title: "Royal Botanic Gardens",
      type: "nature",
      desc: "38 hectares of stunning landscaped gardens along the south bank of the Yarra. Ancient trees, ornamental lakes, fern gullies, a herb garden, a rainforest walk. In late May, autumn foliage colours the gardens in gold and red. A peaceful inner-city oasis. Free guided walks available (1.5 hours with passionate volunteer guides). Aboriginal Heritage Walk is excellent but must be pre-booked.",
      atmosphere: ["quiet", "scenic", "romantic", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Royal_Botanic_Gardens_lake.jpg/960px-Royal_Botanic_Gardens_lake.jpg",
      map: "https://maps.google.com/?q=Royal+Botanic+Gardens+Melbourne",
      cost: { aud: 0, note: "Free" },
      booking: "https://www.rbg.vic.gov.au/melbourne-gardens/",
      transport: [
        { mode: "Walk", cost: "Free", time: "8 min from NGV", note: "Through Alexandra Gardens" }
      ]
    },
    {
      time: "17:30", title: "Shrine of Remembrance",
      type: "culture",
      desc: "Victoria's war memorial, modelled on the Mausoleum at Halicarnassus. The Sanctuary interior houses the Stone of Remembrance, lit by a shaft of sunlight on Remembrance Day. The rooftop balcony offers sweeping 360° views of the Melbourne skyline and gardens. Free guided tours every hour (45 min, A$20). The crypt and galleries are deeply moving.",
      atmosphere: ["quiet", "historic", "scenic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Shrine_of_Remembrance_Melbourne_Australia.jpg/960px-Shrine_of_Remembrance_Melbourne_Australia.jpg",
      map: "https://maps.google.com/?q=Shrine+of+Remembrance+Melbourne",
      cost: { aud: 0, note: "Free (guided tour A$20 pp optional)" },
      booking: "https://www.shrine.org.au/plan-your-visit",
      transport: [
        { mode: "Walk", cost: "Free", time: "10 min from Botanic Gardens", note: "" }
      ]
    },
    {
      time: "19:00", title: "Dinner at Tipo 00",
      type: "food",
      desc: "Award-winning handmade pasta restaurant on Little Bourke Street. Every strand of spaghetti, every sheet of lasagna is made fresh daily. The malfaldine with duck ragù is legendary. Intimate space, open kitchen, impressive wine list focused on Italian varietals. Book ahead -very popular. A$60-80 pp for pasta + wine.",
      atmosphere: ["foodie", "romantic", "upscale"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Flickr_-_cyclonebill_-_Tagliatelle_med_k%C3%B8dboller_og_tomatsauce.jpg/960px-Flickr_-_cyclonebill_-_Tagliatelle_med_k%C3%B8dboller_og_tomatsauce.jpg",
      map: "https://maps.google.com/?q=Tipo+00+361+Little+Bourke+Street+Melbourne",
      cost: { aud: 70, note: "A$60-80 pp with wine" },
      booking: "https://tipo00.com.au/",
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "15 min from Shrine", note: "" }
      ]
    }
  ],
  dayCost: { transport: 0, food: 115, activities: 0, accommodation: 250 }
},
{
  num: 3, date: "Wed, 27 May", title: "Great Ocean Road", theme: "12 Apostles, Wild Koalas, Rainforest & Shipwreck Coast",
  weather: { high: 14, low: 9, icon: "🌧️", desc: "Showers & Wind, 13-15°C" },
  activities: [
    {
      time: "06:30", title: "Hit The Road Boutique Tour -Pickup",
      type: "transport",
      desc: "Small group tour (max 12 people) in a luxury Mercedes Sprinter. Pickup from 196 Flinders St at 06:30 (5-min walk from Collins House). This tour uses the REVERSE route -you visit the 12 Apostles first thing in the morning before the big coaches arrive. 5,000+ five-star reviews. Promo code BOUTIQUE_10 saves A$10/pp.",
      atmosphere: [],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2009-0825-GreatOceanRoadsign.jpg/960px-2009-0825-GreatOceanRoadsign.jpg",
      map: "https://maps.google.com/?q=196+Flinders+Street+Melbourne",
      cost: { aud: 128, note: "A$128 pp (A$118 with promo BOUTIQUE_10)" },
      booking: "https://hittheroadtours.com.au/",
      transport: []
    },
    {
      time: "08:30", title: "Twelve Apostles (Reverse Route -Before the Crowds)",
      type: "nature",
      desc: "THE highlight of the trip. By taking the reverse route via the inland freeway, you arrive at the 12 Apostles early morning before the big coach tours. Eight limestone sea stacks rising 45m from the Southern Ocean, sculpted over millions of years. In late May, you may have them nearly to yourself. Moody winter skies make for the best photography.",
      atmosphere: ["scenic", "quiet", "coastal"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Twelve_Apostles_Port_Campbell_National_Park_Victoria_Australia.JPG/960px-Twelve_Apostles_Port_Campbell_National_Park_Victoria_Australia.JPG",
      map: "https://maps.google.com/?q=Twelve+Apostles+Port+Campbell+National+Park+Victoria",
      cost: { aud: 0, note: "Free, open 24/7" },
      transport: []
    },
    {
      time: "09:15", title: "Razorback & Loch Ard Gorge",
      type: "nature",
      desc: "The Razorback is a narrow rock formation jutting into the ocean. Then walk to Loch Ard Gorge - a spectacular gorge named after the clipper ship that wrecked here in 1878 (52 died, 2 survived). Turquoise water framed by towering cliffs. Self-guided walks cover shipwreck history and coastal geology.",
      atmosphere: ["historic", "scenic", "coastal", "quiet"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Loch_Ard_Gorge%2C_northeast_view_20230217_1.jpg/960px-Loch_Ard_Gorge%2C_northeast_view_20230217_1.jpg",
      map: "https://maps.google.com/?q=Loch+Ard+Gorge+Victoria",
      cost: { aud: 0, note: "Free" },
      transport: []
    },
    {
      time: "10:00", title: "Gibson Steps",
      type: "nature",
      desc: "Descend steep steps carved into the 70m cliff face to the beach at the base of two Apostles formations. Stand on the sand and look up - the scale is humbling. Check tide times; the beach floods at high tide.",
      atmosphere: ["scenic", "coastal", "quiet"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Gibson_steps_-_Great_Ocean_Road.jpg/960px-Gibson_steps_-_Great_Ocean_Road.jpg",
      map: "https://maps.google.com/?q=Gibson+Steps+Port+Campbell+National+Park",
      cost: { aud: 0, note: "Free" },
      transport: []
    },
    {
      time: "11:00", title: "Port Campbell Lunch Stop",
      type: "food",
      desc: "Lunch in the small coastal village of Port Campbell (own expense). Try 12 Rocks Caf\u00e9 or the Port Campbell Takeaway for fish & chips overlooking the bay. The village is tiny, friendly, and unhurried in winter.",
      atmosphere: ["relaxed", "coastal", "local"],
      img: "",
      map: "https://maps.google.com/?q=Port+Campbell+Victoria",
      cost: { aud: 25, note: "A$20-30 pp (own expense)" },
      transport: []
    },
    {
      time: "12:30", title: "Great Otway National Park Rainforest Walk",
      type: "nature",
      desc: "Guided walk through ancient Otway Rainforest. Towering Myrtle Beech draped in moss, tree ferns taller than you, the sound of dripping water. In winter, the forest is lush, green, and mystical. A magical contrast to the coastal scenery.",
      atmosphere: ["quiet", "scenic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Maits_Rest_Rainforest_Trail.jpg/960px-Maits_Rest_Rainforest_Trail.jpg",
      map: "https://maps.google.com/?q=Great+Otway+National+Park+Victoria",
      cost: { aud: 0, note: "Included in tour" },
      transport: []
    },
    {
      time: "13:30", title: "Kennett River Koala Walk - Wild Koalas!",
      type: "nature",
      desc: "THE best place to see wild koalas on the GOR. Walk along Grey River Road and look up into the eucalyptus forks. Late May is the BEST time: bare branches make koalas much easier to spot, and they descend lower for warmth. Also expect King Parrots and Crimson Rosellas. Otway koala population: ~20,000.",
      atmosphere: ["wildlife", "quiet", "scenic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Koala_in_Australia.JPG/960px-Koala_in_Australia.JPG",
      map: "https://maps.google.com/?q=Kennett+River+Victoria+Koala+Walk",
      cost: { aud: 0, note: "Free" },
      transport: []
    },
    {
      time: "14:30", title: "Apollo Bay & Coastal Drive",
      type: "nature",
      desc: "Drive through Apollo Bay, a laidback fishing town with a long curved beach. Then continue along the iconic coastal stretch - Memorial Arch, surf coast beaches, and ocean views. The road hugs the cliffs with the Southern Ocean crashing below.",
      atmosphere: ["scenic", "coastal", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Apollo_Bay_Harbour_%288653735055%29.jpg/960px-Apollo_Bay_Harbour_%288653735055%29.jpg",
      map: "https://maps.google.com/?q=Apollo+Bay+Victoria",
      cost: { aud: 0, note: "Scenic drive" },
      transport: []
    },
    {
      time: "16:00", title: "Surf Coast Beaches & Return Drive",
      type: "nature",
      desc: "Final stops along the surf coast. Then return via the freeway to Melbourne. Arrive back ~19:00.",
      atmosphere: ["scenic", "coastal"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bells_beach_surfers.JPG/960px-Bells_beach_surfers.JPG",
      map: "https://maps.google.com/?q=Bells+Beach+Victoria",
      cost: { aud: 0, note: "Included" },
      transport: []
    },
    {
      time: "19:30", title: "Dinner at Supernormal",
      type: "food",
      desc: "Andrew McConnell's pan-Asian restaurant on Flinders Lane. Lobster rolls, prawn toast, dumplings, bao, and charcoal grilled dishes. Slick, modern interior. A$50-75 pp. Walk-ins welcome.",
      atmosphere: ["foodie", "upscale", "busy"],
      img: "",
      map: "https://maps.google.com/?q=Supernormal+Flinders+Lane+Melbourne",
      cost: { aud: 60, note: "A$50-75 pp" },
      booking: "https://supernormal.net.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "8 min from Collins House", note: "" }
      ]
    }
  ],
  dayCost: { transport: 128, food: 85, activities: 0, accommodation: 250 }
},
{
  num: 4, date: "Thu, 28 May", title: "Melbourne Exploration", theme: "Aquarium, Skydeck, Museum & Richmond",
  weather: { high: 13, low: 8, icon: "\ud83c\udf2c\ufe0f", desc: "Windy, Partly Cloudy, 13\u00b0C" },
  activities: [
    {
      time: "09:00", title: "Sleep In & Leisurely Breakfast",
      type: "food",
      desc: "Recover from yesterday's 12-hour GOR tour. Take your time - make breakfast in the apartment kitchen or walk to Degraves Street for a flat white and eggs.",
      atmosphere: ["relaxed"],
      img: "",
      map: "https://maps.google.com/?q=Degraves+Street+Melbourne",
      cost: { aud: 15, note: "A$12-18 pp" },
      transport: []
    },
    {
      time: "10:30", title: "SEA LIFE Melbourne Aquarium",
      type: "nature",
      desc: "Walk through the underwater glass tunnel surrounded by sharks, rays, and giant fish. The Penguin Passport experience lets you suit up in Antarctic gear and meet the resident King and Gentoo Penguins. New Rocky Shores zone. Allow 1.5-2 hours. Book online for the cheapest weekday rate (A$53 walk-up/weekend).",
      atmosphere: ["family", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/MelbourneAquariumEast.JPG/960px-MelbourneAquariumEast.JPG",
      map: "https://maps.google.com/?q=SEA+LIFE+Melbourne+Aquarium+King+Street",
      cost: { aud: 39, note: "From A$39 pp (online weekday advance)" },
      booking: "https://www.visitsealife.com/melbourne/",
      transport: [
        { mode: "Walk", cost: "Free", time: "10 min from Collins House", note: "Along the Yarra River" }
      ]
    },
    {
      time: "12:30", title: "Lunch at South Wharf Promenade",
      type: "food",
      desc: "Waterfront dining along the Yarra River at South Wharf. Try Boho (Mexican), Akachochin (Japanese izakaya), or Meat Market (steakhouse). Casual, scenic, and not overly touristy.",
      atmosphere: ["relaxed", "scenic", "foodie"],
      img: "",
      map: "https://maps.google.com/?q=South+Wharf+Promenade+Melbourne",
      cost: { aud: 30, note: "A$25-35 pp" },
      transport: [
        { mode: "Walk", cost: "Free", time: "10 min from Aquarium", note: "Along Southbank" }
      ]
    },
    {
      time: "14:00", title: "Melbourne Museum",
      type: "culture",
      desc: "Victoria's major natural and cultural history museum in Carlton Gardens. Currently hosting: Triceratops: Fate of the Dinosaurs, Our Wondrous Planet, and Empire Power People (Ancient Rome). Children under 16 free. A$18/adult. Allow 2-3 hours.",
      atmosphere: ["quiet", "family", "historic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Melbourne_Museum_exterior.jpg/960px-Melbourne_Museum_exterior.jpg",
      map: "https://maps.google.com/?q=Melbourne+Museum+11+Nicholson+Street+Carlton",
      cost: { aud: 18, note: "A$18 pp. Under 16 free." },
      booking: "https://museumsvictoria.com.au/melbournemuseum/tickets/",
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "15 min", note: "Tram along Nicholson St, Free Tram Zone" },
        { mode: "Uber", cost: "A$10-15", time: "8 min", note: "" }
      ]
    },
    {
      time: "16:30", title: "Eureka Skydeck - The Edge Experience",
      type: "culture",
      desc: "Level 88 of Eureka Tower - 285 metres up. The Edge Experience slides a glass cube 3 metres out from the building with you inside it, suspended 88 floors above the street. Views stretch across Port Phillip Bay, the Dandenong Ranges, and the entire Melbourne skyline. Best visited on a clear afternoon for golden hour light.",
      atmosphere: ["scenic", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Melbourne_%28AU%29%2C_View_from_Eureka_Tower%2C_Northbank_--_2019_--_1461.jpg/960px-Melbourne_%28AU%29%2C_View_from_Eureka_Tower%2C_Northbank_--_2019_--_1461.jpg",
      map: "https://maps.google.com/?q=Eureka+Skydeck+7+Riverside+Quay+Southbank",
      cost: { aud: 55, note: "A$47-61 pp (Skydeck + Edge combo)" },
      booking: "https://www.melbourneskydeck.com.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "40 min from Museum", note: "3.5 km through Carlton Gardens & CBD" },
        { mode: "Uber", cost: "A$10-15", time: "8 min", note: "" }
      ]
    },
    {
      time: "18:00", title: "Walk Along Southbank Promenade",
      type: "culture",
      desc: "Take the Southbank Promenade from Eureka Tower along the Yarra River. Crown's fire pillars erupt on the hour after dark. Public art installations line the walkway. This is Melbourne's most photogenic walk at dusk.",
      atmosphere: ["romantic", "scenic", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Southbank_and_Yarra_River%2C_Melbourne%2C_as_seen_from_Evan_Walker_Bridge_20230219_1.jpg/960px-Southbank_and_Yarra_River%2C_Melbourne%2C_as_seen_from_Evan_Walker_Bridge_20230219_1.jpg",
      map: "https://maps.google.com/?q=Southbank+Promenade+Melbourne",
      cost: { aud: 0, note: "Free" },
      transport: []
    },
    {
      time: "19:00", title: "Dinner on Victoria Street, Richmond - Vietnamese",
      type: "food",
      desc: "Melbourne's \"Little Saigon.\" Try Pho Hung Vuong (legendary pho since 1982), Thanh Ha 2 (crispy banh xeo), or Nhu Lan Bakery (best banh mi, A$6.50). Bustling, no-frills, absolutely delicious. A taste of home for Singaporeans.",
      atmosphere: ["multicultural", "busy", "foodie", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Victoria_Street_Gateway.jpg/960px-Victoria_Street_Gateway.jpg",
      map: "https://maps.google.com/?q=Victoria+Street+Richmond+Melbourne",
      cost: { aud: 20, note: "A$15-25 pp" },
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "12 min from Southbank", note: "Tram 78 or 109" },
        { mode: "Uber", cost: "A$10-15", time: "8 min", note: "" }
      ]
    }
  ],
  dayCost: { transport: 0, food: 65, activities: 112, accommodation: 250 }
},
{
  num: 5, date: "Fri, 29 May", title: "Phillip Island Wildlife", theme: "Penguins, Koalas, Seals & Coastal Wildlife",
  weather: { high: 14, low: 8, icon: "⛅", desc: "Partly Cloudy, Cool" },
  activities: [
    {
      time: "08:00", title: "Breakfast at Hotel & Prepare for a Long Day",
      type: "food",
      desc: "Have a good breakfast -it's a full 12-14 hour day. Pack warm layers for the evening Penguin Parade (you'll be sitting outdoors at sunset in 8°C). Beanie, scarf, and gloves recommended.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 15 },
      transport: []
    },
    {
      time: "09:00", title: "Depart Melbourne for Phillip Island",
      type: "transport",
      desc: "Private transfer or guided tour bus (Localing Tours private: A$2,140 for 2 with dinner included; or Sightseeing Tours Australia from A$125 pp including Penguin Parade ticket). Journey is ~2 hours via the M1 and Bass Highway, crossing the bridge to Phillip Island.",
      atmosphere: [],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Australia_-_Phillip_Island_-_Bridge.jpg/960px-Australia_-_Phillip_Island_-_Bridge.jpg",
      map: "https://maps.google.com/?q=Phillip+Island+Victoria",
      cost: { aud: 125, note: "From A$125 pp (guided tour) or A$2,140 (private)" },
      booking: "https://www.penguins.org.au/",
      transport: [
        { mode: "Guided Tour", cost: "A$125-180 pp", time: "2h drive", note: "Includes hotel pickup & Penguin Parade ticket" },
        { mode: "Private (Localing)", cost: "A$2,140 for 2", time: "2h drive", note: "Includes dinner, private guide, all entries" }
      ]
    },
    {
      time: "11:00", title: "Churchill Island Heritage Farm",
      type: "culture",
      desc: "A working heritage farm connected to Phillip Island by a short bridge. Shearing demonstrations, cow milking, and heritage gardens. Peaceful and pastoral. Beautiful grounds with views across Western Port Bay. Allow 1-1.5 hours.",
      atmosphere: ["quiet", "historic", "family", "scenic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Churchill_Farm.jpg/960px-Churchill_Farm.jpg",
      map: "https://maps.google.com/?q=Churchill+Island+Heritage+Farm+Victoria",
      cost: { aud: 14, note: "A$13.50 pp (or included in 3 Parks Pass A$59.50 pp)" },
      booking: "https://www.penguins.org.au/attractions/churchill-island/",
      transport: []
    },
    {
      time: "12:30", title: "Lunch at Cowes",
      type: "food",
      desc: "Phillip Island's main town. A small, friendly seaside village with fish & chip shops, bakeries, and cafes along Thompson Avenue. Try the Madcowes Café or Isola di Capri for Italian. The beach is sheltered and pleasant even in winter.",
      atmosphere: ["local", "relaxed", "coastal"],
      img: "",
      map: "https://maps.google.com/?q=Cowes+Phillip+Island+Victoria",
      cost: { aud: 25, note: "A$20-30 pp" },
      transport: []
    },
    {
      time: "14:00", title: "Koala Conservation Centre",
      type: "nature",
      desc: "Elevated boardwalks through natural bushland bring you to eye-level with koalas in their natural habitat. Rangers share fascinating facts about koala biology, diet, and conservation. You'll get very close -some koalas sit at arm's length. Allow 1 hour.",
      atmosphere: ["wildlife", "quiet", "family"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Koala_Phillip_Island_z.JPG/960px-Koala_Phillip_Island_z.JPG",
      map: "https://maps.google.com/?q=Koala+Conservation+Centre+Phillip+Island",
      cost: { aud: 14, note: "A$13.20 pp (or included in 3 Parks Pass)" },
      booking: "https://www.penguins.org.au/attractions/koala-conservation-reserve/",
      transport: []
    },
    {
      time: "15:15", title: "The Nobbies & Seal Rocks",
      type: "nature",
      desc: "A windswept boardwalk along dramatic cliff tops at the western tip of Phillip Island. From here, you can see Seal Rocks -home to Australia's largest fur seal colony (~25,000 seals). Bring binoculars. The boardwalk views are spectacular. Free entry. Allow 45 min.",
      atmosphere: ["scenic", "coastal", "wildlife", "quiet"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Nobbies_Boardwalk%2C_Phillip_Island.png/960px-Nobbies_Boardwalk%2C_Phillip_Island.png",
      map: "https://maps.google.com/?q=The+Nobbies+Phillip+Island",
      cost: { aud: 0, note: "Free" },
      transport: []
    },
    {
      time: "16:15", title: "Penguin Parade -Underground Viewing",
      type: "nature",
      desc: "The main event. Every evening at sunset, hundreds of Little (Fairy) Penguins waddle up the beach from the ocean to their burrows in the sand dunes. In late May, sunset is ~5:15 PM. Arrive early to get settled. Underground Viewing (A$103 pp) lets you watch through glass panels at penguin eye-level as they walk right past you -an incredible, intimate experience. No cameras or recording devices allowed. Dress VERY warm (8°C with wind chill).",
      atmosphere: ["wildlife", "scenic", "quiet", "romantic"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eudyptula_minor_Phillip_Island_2.JPG/960px-Eudyptula_minor_Phillip_Island_2.JPG",
      map: "https://maps.google.com/?q=Phillip+Island+Penguin+Parade",
      cost: { aud: 103, note: "A$103 pp (Underground Viewing)" },
      booking: "https://bookings.penguins.org.au/",
      transport: []
    },
    {
      time: "18:00", title: "Return to Melbourne",
      type: "transport",
      desc: "Drive back to Melbourne (~2 hours). You'll arrive around 20:00. If on a guided tour, the bus returns to your hotel. If on a private tour, your driver drops you at Collins House.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 0, note: "Included in tour price" },
      transport: []
    },
    {
      time: "20:30", title: "Late Dinner at Hotel (Self-Catering)",
      type: "food",
      desc: "Pick up takeaway from Uber Eats or a nearby restaurant. You'll be tired after a long day. The apartment kitchen lets you keep it simple.",
      atmosphere: ["relaxed"],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 20, note: "A$15-25 pp" },
      transport: []
    }
  ],
  dayCost: { transport: 250, food: 60, activities: 190, accommodation: 250 }
},
{
  num: 6, date: "Sat, 30 May", title: "Puffing Billy & Dandenong Ranges", theme: "Heritage Railway, Rainforest & Italian Dinner",
  weather: { high: 14, low: 7, icon: "☁️", desc: "Cool, Overcast, Possible Showers" },
  activities: [
    {
      time: "08:00", title: "Breakfast at Hotel",
      type: "food",
      desc: "Self-catering or grab a quick coffee from Little Rogue on Drewery Lane (superb espresso, tiny standing-room-only bar).",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 10 },
      transport: []
    },
    {
      time: "08:45", title: "Train to Belgrave",
      type: "transport",
      desc: "Take the Belgrave line from Flinders Street Station directly to Belgrave -the terminus. ~75 min ride through Melbourne's eastern suburbs into the Dandenong Ranges. FREE on public transport this week (May 25-31).",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Belgrave+Railway+Station+Victoria",
      cost: { aud: 0, note: "FREE (public transport free until May 31)" },
      transport: [
        { mode: "Metro Train (FREE)", cost: "Free", time: "75 min", note: "Belgrave line from Flinders St Station" }
      ]
    },
    {
      time: "10:00", title: "Puffing Billy Railway -Belgrave to Lakeside",
      type: "culture",
      desc: "Australia's favourite heritage steam train. The century-old locomotive chugs through towering mountain ash forests, across the iconic Monbulk Creek Trestle Bridge. Open-air carriages let you dangle your legs over the side (traditional, but cold in winter -dress warm!). The 13 km journey to Lakeside takes ~1 hour. At Lakeside, the train pauses for 30 min before returning. MUST pre-book. No tickets sold on the day.",
      atmosphere: ["scenic", "historic", "family"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Puffing_Billy_Railway_14A_on_the_Monbulk_Creek_Trestle_Bridge_-_May_2014_-_01.jpg/960px-Puffing_Billy_Railway_14A_on_the_Monbulk_Creek_Trestle_Bridge_-_May_2014_-_01.jpg",
      map: "https://maps.google.com/?q=Puffing+Billy+Railway+Belgrave",
      cost: { aud: 64, note: "A$64 pp return (Belgrave-Lakeside)" },
      booking: "https://puffingbillyrailway.org.au/buy-tickets/",
      transport: []
    },
    {
      time: "12:30", title: "Explore Lakeside & Emerald Village",
      type: "nature",
      desc: "At Lakeside, enjoy views over Emerald Lake Park. Walk around the lake (30 min circuit). The nearby town of Emerald has cafes and a general store for lunch. Alternatively, pack a picnic from QVM or Woolworths.",
      atmosphere: ["quiet", "scenic", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Lake_emerald.jpg/960px-Lake_emerald.jpg",
      map: "https://maps.google.com/?q=Emerald+Lake+Park+Victoria",
      cost: { aud: 20, note: "A$15-25 pp for lunch" },
      transport: []
    },
    {
      time: "14:00", title: "Return Puffing Billy to Belgrave",
      type: "transport",
      desc: "Board the return steam train. Same beautiful journey in reverse. Arrive Belgrave ~15:00.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Belgrave+Railway+Station+Victoria",
      cost: { aud: 0, note: "Included in return ticket" },
      transport: []
    },
    {
      time: "15:30", title: "Train Back to Melbourne",
      type: "transport",
      desc: "Metro train from Belgrave to Flinders Street Station. ~75 min. Free transport.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Flinders+Street+Station+Melbourne",
      cost: { aud: 0, note: "FREE" },
      transport: []
    },
    {
      time: "17:00", title: "Chapel Street & South Yarra Browsing",
      type: "culture",
      desc: "Stretch your legs with a stroll down Chapel Street. The South Yarra end is upscale -designer boutiques, fashion flagships, chic wine bars. Walking south toward Prahran and Windsor, it becomes edgier with vintage stores, streetwear, and quirky bars. Four kilometres of Melbourne fashion culture.",
      atmosphere: ["upscale", "local", "artsy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Chapel_St_in_South_Yarra.jpg/960px-Chapel_St_in_South_Yarra.jpg",
      map: "https://maps.google.com/?q=Chapel+Street+South+Yarra+Melbourne",
      cost: { aud: 0, note: "Free to browse" },
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "20 min from Flinders St", note: "Tram 78 or 79" },
        { mode: "Uber", cost: "A$12-18", time: "10 min", note: "" }
      ]
    },
    {
      time: "19:00", title: "Dinner on Lygon Street, Carlton",
      type: "food",
      desc: "Melbourne's 'Little Italy.' Post-war Italian migrants turned this into a pasta paradise. Try Capitano (creative modern Italian, pasta alla vodka A$24), D.O.C. (authentic Napoletana pizza, mozzarella bar), or Tiamo (beloved no-frills Italian since 1986). Lygon Street buzzes on Saturday nights.",
      atmosphere: ["foodie", "multicultural", "busy", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Lygon_Street%2C_Carlton.jpg/960px-Lygon_Street%2C_Carlton.jpg",
      map: "https://maps.google.com/?q=Lygon+Street+Carlton+Melbourne",
      cost: { aud: 50, note: "A$40-60 pp with wine" },
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "15 min", note: "Tram 1 or 6 up Swanston St" },
        { mode: "Uber", cost: "A$10-15", time: "8 min", note: "" }
      ]
    }
  ],
  dayCost: { transport: 0, food: 80, activities: 64, accommodation: 250 }
},
{
  num: 7, date: "Sun, 31 May", title: "Beaches & Neighborhoods", theme: "Brighton, St Kilda, Fitzroy & Collingwood",
  weather: { high: 15, low: 8, icon: "☀️", desc: "Sunny Intervals, 15°C" },
  activities: [
    {
      time: "08:30", title: "Breakfast at Hotel",
      type: "food",
      desc: "Self-catering or coffee at Patricia Coffee Brewers (standing bar, no seats, incredible coffee).",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 10 },
      transport: []
    },
    {
      time: "09:30", title: "Brighton Beach Bathing Boxes",
      type: "culture",
      desc: "93 heritage-listed wooden bathing boxes painted in vibrant colours, standing in a row along Dendy Street Beach. Privately owned (some sell for A$300k+), they're a beloved Melbourne icon. Perfect for photos against the Port Phillip Bay backdrop. In late May, the beach is quiet and the light is gorgeous. Free to visit, 30-60 min.",
      atmosphere: ["scenic", "quiet", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/PXL_20241005_062211747.MP_Brighton_Bathing_Boxes_Esplanade%2C_Brighton_VIC_3186%2C_Australia_01.jpg/960px-PXL_20241005_062211747.MP_Brighton_Bathing_Boxes_Esplanade%2C_Brighton_VIC_3186%2C_Australia_01.jpg",
      map: "https://maps.google.com/?q=Brighton+Bathing+Boxes+Dendy+Street+Beach",
      cost: { aud: 0, note: "Free" },
      transport: [
        { mode: "Train (FREE)", cost: "Free", time: "23 min", note: "Sandringham line from Flinders St to Brighton Beach station, 15-min walk to boxes" },
        { mode: "Uber", cost: "A$20-35", time: "20 min", note: "" }
      ]
    },
    {
      time: "10:30", title: "St Kilda Beach & Pier",
      type: "nature",
      desc: "Melbourne's most famous beach suburb. Walk along the palm-tree-lined foreshore to St Kilda Pier. At the end of the pier's breakwater, a colony of Little Penguins nests in the rock crevices -they're best seen at dusk, but you may spot a few during the day. The pier has sweeping views of the city skyline. Luna Park's giant grinning mouth entrance is just along the Esplanade.",
      atmosphere: ["bohemian", "relaxed", "coastal", "touristy"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Melbourne_%28AU%29%2C_St_Kilda_Beach_--_2019_--_1590.jpg/960px-Melbourne_%28AU%29%2C_St_Kilda_Beach_--_2019_--_1590.jpg",
      map: "https://maps.google.com/?q=St+Kilda+Beach+Melbourne",
      cost: { aud: 0, note: "Free" },
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "15 min from Brighton", note: "Bus 600/922/923 between Brighton and St Kilda, or tram 16" },
        { mode: "Uber", cost: "A$10-15", time: "8 min from Brighton", note: "" }
      ]
    },
    {
      time: "11:30", title: "Luna Park Melbourne",
      type: "culture",
      desc: "Heritage amusement park (opened 1912) with the famous grinning face entrance. Opens Sat-Sun 11 AM-6 PM. Unlimited Rides tickets A$55 pp, or just enjoy the free-entry promenade and take photos. The Scenic Railway is the world's oldest continually operating roller coaster (1912). Fun, retro atmosphere.",
      atmosphere: ["family", "touristy", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Melbourne%27s_Luna_Park_entrance_at_night.jpg/960px-Melbourne%27s_Luna_Park_entrance_at_night.jpg",
      map: "https://maps.google.com/?q=Luna+Park+Melbourne",
      cost: { aud: 0, note: "Free entry. Rides: A$55 pp unlimited, or A$30 single ride entry." },
      booking: "https://lunapark.com.au/tickets/",
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from St Kilda Beach", note: "" }
      ]
    },
    {
      time: "12:30", title: "Lunch on Acland Street, St Kilda",
      type: "food",
      desc: "St Kilda's main dining strip. Famous for European cake shops (Monarch Cakes, Acland Street), brunch cafés, and eclectic restaurants. Try Lau's Kitchen for Vietnamese, Batch Espresso for brunch, or Cicciolina for wine and Mediterranean plates. St Kilda on a Sunday is buzzy, with the Esplanade Market running along the foreshore (weather permitting).",
      atmosphere: ["bohemian", "foodie", "local", "multicultural"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Acland_Street_in_St_Kilda.jpg/960px-Acland_Street_in_St_Kilda.jpg",
      map: "https://maps.google.com/?q=Acland+Street+St+Kilda+Melbourne",
      cost: { aud: 30, note: "A$25-35 pp" },
      transport: []
    },
    {
      time: "14:00", title: "Fitzroy -Brunswick Street",
      type: "culture",
      desc: "Melbourne's bohemian heartland. Brunswick Street is a non-stop strip of vintage shops, record stores, independent bookshops, tattoo parlours, quirky bars, and cafés. Street art covers every surface. The vibe is proudly grungy yet stylish -Japanese cafés next to dive bars, fashion studios next to Ethiopian restaurants. This is where Melbourne's creative class lives.",
      atmosphere: ["bohemian", "artsy", "grungy", "multicultural", "local"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Brunswick_Street%2C_Fitzroy%2C_Victoria%2C_Australia.jpg/960px-Brunswick_Street%2C_Fitzroy%2C_Victoria%2C_Australia.jpg",
      map: "https://maps.google.com/?q=Brunswick+Street+Fitzroy+Melbourne",
      cost: { aud: 0, note: "Free to explore" },
      transport: [
        { mode: "Tram (FREE)", cost: "Free", time: "30 min from St Kilda", note: "Tram 16 to Flinders St, then tram 11 to Brunswick St" },
        { mode: "Uber", cost: "A$15-25", time: "15 min", note: "" }
      ]
    },
    {
      time: "16:00", title: "Collingwood -Smith Street",
      type: "culture",
      desc: "Named the 'coolest neighbourhood in the world' by Time Out. Grittier than Fitzroy, less polished. Smith Street is the main artery: Vietnamese bakeries sit beside rooftop bars, independent galleries hide in converted warehouses. Visit Collingwood Yards (creative hub), browse independent boutiques, or duck into an anonymous-looking door that turns out to be a natural wine bar.",
      atmosphere: ["bohemian", "grungy", "artsy", "multicultural"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Looking_north_on_Smith_Street_December_2020.jpg/960px-Looking_north_on_Smith_Street_December_2020.jpg",
      map: "https://maps.google.com/?q=Smith+Street+Collingwood+Melbourne",
      cost: { aud: 0, note: "Free to explore" },
      transport: [
        { mode: "Walk", cost: "Free", time: "10 min from Brunswick St", note: "" }
      ]
    },
    {
      time: "17:30", title: "Coffee at Industry Beans",
      type: "food",
      desc: "Melbourne's most inventive specialty coffee roaster. Experimental brews, single-origin pours, and a sleek industrial-chic space in a converted Fitzroy warehouse. Try the signature espresso or a pourover. Also serves excellent brunch food.",
      atmosphere: ["artsy", "local", "foodie"],
      img: "",
      map: "https://maps.google.com/?q=Industry+Beans+Fitzroy+Melbourne",
      cost: { aud: 8, note: "A$6-10 pp" },
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from Smith St", note: "" }
      ]
    },
    {
      time: "18:30", title: "Dinner at Cutler & Co",
      type: "food",
      desc: "Andrew McConnell's flagship. Refined Australian dining in a converted metalworks factory on Gertrude Street. Seasonal tasting menus or à la carte. Sunday supper menu (3 courses, A$90) is excellent value. Wine list is extraordinary. Book well ahead. One of Melbourne's best restaurants.",
      atmosphere: ["upscale", "foodie", "romantic"],
      img: "",
      map: "https://maps.google.com/?q=Cutler+and+Co+Fitzroy+Melbourne",
      cost: { aud: 100, note: "A$90-120 pp (Sunday supper)" },
      booking: "https://www.cutlerandco.com.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from Industry Beans", note: "" }
      ]
    }
  ],
  dayCost: { transport: 0, food: 148, activities: 0, accommodation: 250 }
},
{
  num: 8, date: "Mon, 1 Jun", title: "Mornington Peninsula", theme: "Hot Springs, Coastal Views & Fine Dining",
  weather: { high: 14, low: 8, icon: "☁️", desc: "Cloudy, Cool" },
  activities: [
    {
      time: "07:30", title: "Breakfast at Hotel",
      type: "food",
      desc: "Fuel up -long day ahead. Self-catering or quick coffee from a nearby café.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 10 },
      transport: []
    },
    {
      time: "08:30", title: "Train to Frankston",
      type: "transport",
      desc: "Frankston line from Flinders Street Station to Frankston (~60 min). From June 1, public transport is HALF PRICE (daily cap A$5.70, 2-hour fare A$2.85). You'll need a Myki card -buy one at any 7-Eleven for A$6 + top up.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Frankston+Station+Victoria",
      cost: { aud: 3, note: "A$2.85 pp (half-price fare)" },
      transport: [
        { mode: "Train (half-price)", cost: "A$2.85 pp", time: "60 min", note: "Buy Myki at 7-Eleven (A$6 + top-up)" }
      ]
    },
    {
      time: "09:30", title: "Bus 788 to Rye + Uber to Hot Springs",
      type: "transport",
      desc: "Bus 788 from Frankston Station along the coast to Rye (~50 min, Myki fare). Then Uber/taxi from Rye to Peninsula Hot Springs (~15 min, A$30-40). Or pre-book the Hot Springs shuttle (Tue/Sat only -not available Monday).",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Peninsula+Hot+Springs+Fingal+Victoria",
      cost: { aud: 35, note: "A$30-40 Uber from Rye" },
      transport: [
        { mode: "Bus 788 + Uber", cost: "A$3 + A$35", time: "50 min + 15 min", note: "Bus is half-price Myki fare" }
      ]
    },
    {
      time: "10:30", title: "Peninsula Hot Springs -Weekday Getaway for Two",
      type: "nature",
      desc: "20+ open-air geothermal pools ranging from 36-43°C, set in lush bushland. The Weekday Getaway for Two (A$235) includes Bath House bathing + pizzas & juice for both. Soak in the hilltop pool for panoramic views across the green hills. In winter, the steam rising from the hot water into the cool air is magical. Adults-only (16+). Towel, robe, locker hire included. Allow 3-4 hours to fully relax.",
      atmosphere: ["relaxed", "romantic", "scenic", "quiet"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Yarrangobilly_Caves_thermal_pools.jpg/960px-Yarrangobilly_Caves_thermal_pools.jpg",
      map: "https://maps.google.com/?q=Peninsula+Hot+Springs+140+Springs+Lane+Fingal+Victoria",
      cost: { aud: 118, note: "A$235 for 2 (Weekday Getaway incl. pizza & juice)" },
      booking: "https://www.peninsulahotsprings.com/bathe/bath-house/weekday-getaway-for-two",
      transport: []
    },
    {
      time: "14:30", title: "Explore Sorrento Village",
      type: "culture",
      desc: "Historic seaside village on the tip of the Mornington Peninsula. Limestone heritage buildings, boutique shops, galleries, and the Sorrento Hotel (1871). Walk along the foreshore and watch the Port Phillip Bay ferries. Pop into Sorrento Cellars for local wine tasting.",
      atmosphere: ["scenic", "quiet", "historic", "upscale"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Ocean_Beach_Road%2C_Sorrento%2C_Victoria%2C_2018%2C_14.jpg/960px-Ocean_Beach_Road%2C_Sorrento%2C_Victoria%2C_2018%2C_14.jpg",
      map: "https://maps.google.com/?q=Sorrento+Victoria+Australia",
      cost: { aud: 0, note: "Free to explore (wine tasting ~A$10-20)" },
      transport: [
        { mode: "Uber", cost: "A$25-35", time: "20 min from Hot Springs", note: "Pre-book return Uber -driver availability can be limited on the Peninsula" }
      ]
    },
    {
      time: "16:00", title: "Return to Melbourne",
      type: "transport",
      desc: "Uber to Frankston Station (~A$50-60 from Sorrento) or Bus 788 to Frankston. Train back to CBD. Arrive ~17:30.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 55, note: "A$50-60 Uber to Frankston + A$2.85 train" },
      transport: [
        { mode: "Uber + Train", cost: "A$55-65 total", time: "1.5 hours", note: "" },
        { mode: "Bus 788 + Train", cost: "A$5.70", time: "2 hours", note: "More time, much cheaper" }
      ]
    },
    {
      time: "18:00", title: "Rest & Refresh at Hotel",
      type: "transport",
      desc: "Freshen up before dinner. You've had a relaxing spa day -carry the zen into the evening.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 0 },
      transport: []
    },
    {
      time: "19:30", title: "Fine Dining at Gimlet",
      type: "food",
      desc: "Andrew McConnell's glamorous 1920s-inspired brasserie at 33 Russell Street. Lobster thermidor, caviar, oysters, and cocktails in an opulent Art Deco space with crystal chandeliers and velvet banquettes. Dress up. A$100-150 pp with drinks. Book ahead.",
      atmosphere: ["upscale", "romantic", "foodie"],
      img: "",
      map: "https://maps.google.com/?q=Gimlet+33+Russell+Street+Melbourne",
      cost: { aud: 120, note: "A$100-150 pp with cocktails" },
      booking: "https://gimletmelbourne.com.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "8 min from Collins House", note: "" }
      ]
    }
  ],
  dayCost: { transport: 100, food: 130, activities: 118, accommodation: 250 }
},
{
  num: 9, date: "Tue, 2 Jun", title: "Zoo, Museums & Shopping", theme: "Melbourne Zoo, Souvenirs & Farewell Dinner",
  weather: { high: 14, low: 7, icon: "☁️", desc: "Cool, Overcast" },
  activities: [
    {
      time: "08:30", title: "Breakfast at Hotel",
      type: "food",
      desc: "Self-catering or walk to Market Lane Coffee at Collins Quarter for a final Melbourne flat white.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 10 },
      transport: []
    },
    {
      time: "09:30", title: "Melbourne Zoo",
      type: "nature",
      desc: "Australia's oldest zoo (est. 1862), just minutes north of the CBD. Home to 320+ animal species including platypus, Tasmanian Devils, koalas, kangaroos, gorillas, snow leopards, and elephants. Highlights: the Australian Bush habitat (walk among free-roaming kangaroos), the Platypus House, and the Gorilla Rainforest. Allow 3 hours. A$54.50/adult.",
      atmosphere: ["family", "local", "wildlife"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Melbourne_Zoo_entrance_1a.jpg/960px-Melbourne_Zoo_entrance_1a.jpg",
      map: "https://maps.google.com/?q=Melbourne+Zoo+Elliott+Avenue+Parkville",
      cost: { aud: 55, note: "A$54.50 pp" },
      booking: "https://www.zoo.org.au/melbourne/",
      transport: [
        { mode: "Tram 58 (half-price)", cost: "A$2.85 pp", time: "15 min", note: "Stop 26, directly outside zoo" },
        { mode: "Uber", cost: "A$12-20", time: "8 min", note: "" }
      ]
    },
    {
      time: "12:30", title: "Lunch on Lygon Street (Carlton)",
      type: "food",
      desc: "A short walk from the zoo into Carlton's Italian quarter. Try Jimmy Watson's Wine Bar (since 1935, great wine by the glass + cheese boards) or grab a quick wood-fired pizza at D.O.C. (authentic Napoletana, ~A$22).",
      atmosphere: ["foodie", "multicultural", "local"],
      img: "",
      map: "https://maps.google.com/?q=Lygon+Street+Carlton+Melbourne",
      cost: { aud: 25, note: "A$20-30 pp" },
      transport: [
        { mode: "Walk", cost: "Free", time: "15 min from zoo", note: "Through Royal Park" }
      ]
    },
    {
      time: "14:00", title: "Shopping -Emporium Melbourne & Melbourne Central",
      type: "culture",
      desc: "Connected premium shopping centres in the CBD. Emporium has high-end fashion (Saba, Scanlan Theodore, Country Road), homewares, and a rooftop dining precinct. Melbourne Central has the heritage shot tower preserved under a glass cone. Browse Australian brands for souvenirs: R.M. Williams (boots), Aesop (skincare, born in Melbourne), T2 Tea.",
      atmosphere: ["busy", "upscale"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Melbourne_Central_Shopping_Centre.jpg/960px-Melbourne_Central_Shopping_Centre.jpg",
      map: "https://maps.google.com/?q=Emporium+Melbourne+287+Lonsdale+Street",
      cost: { aud: 0, note: "Free to browse" },
      transport: [
        { mode: "Tram (half-price)", cost: "A$2.85", time: "10 min from Lygon St", note: "Free Tram Zone in CBD" }
      ]
    },
    {
      time: "15:30", title: "DFO South Wharf (Outlet Shopping)",
      type: "culture",
      desc: "If you want bargains: 180+ outlet stores with up to 70% off retail. Armani, Ralph Lauren, Calvin Klein, Tommy Hilfiger, Nike Factory, Kathmandu, Converse, Levi's. Waterfront location along the Yarra. Good for stocking up on Australian-brand clothing at discount prices.",
      atmosphere: ["busy", "local"],
      img: "",
      map: "https://maps.google.com/?q=DFO+South+Wharf+Melbourne",
      cost: { aud: 0, note: "Free to browse" },
      booking: "https://www.south-wharf.dfo.com.au/",
      transport: [
        { mode: "Walk", cost: "Free", time: "15 min from CBD", note: "Along Southbank Promenade" },
        { mode: "Tram 58", cost: "A$2.85", time: "8 min", note: "" }
      ]
    },
    {
      time: "17:00", title: "Return to Hotel & Pack",
      type: "transport",
      desc: "Head back to Collins House. Start packing for tomorrow's departure. Organise luggage, check TR59 flight status on the Scoot app.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 0 },
      transport: []
    },
    {
      time: "19:00", title: "Farewell Dinner at Flower Drum",
      type: "food",
      desc: "Melbourne's legendary Cantonese restaurant, operating since 1975 on Market Lane in Chinatown. Peking duck (carved tableside), mud crab with XO sauce, pipis with black bean sauce. Impeccable white-tablecloth service. A$100-150 pp. Book well ahead -this is Melbourne's most iconic restaurant. A fitting farewell to the city.",
      atmosphere: ["upscale", "foodie", "historic"],
      img: "",
      map: "https://maps.google.com/?q=Flower+Drum+17+Market+Lane+Melbourne",
      cost: { aud: 130, note: "A$100-150 pp" },
      booking: "https://www.flowerdrum.melbourne/",
      transport: [
        { mode: "Walk", cost: "Free", time: "5 min from Collins House", note: "" }
      ]
    },
    {
      time: "21:00", title: "Final Walk Along Southbank Promenade",
      type: "culture",
      desc: "A last stroll along the Yarra River at night. The city skyline reflected in the water, the Arts Centre spire illuminated, Crown's fire pillars erupting on the hour. Melbourne at its most photogenic.",
      atmosphere: ["romantic", "scenic", "relaxed"],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Melbourne_At_Night_from_Southbank_Bridge.JPG/960px-Melbourne_At_Night_from_Southbank_Bridge.JPG",
      map: "https://maps.google.com/?q=Southbank+Promenade+Melbourne",
      cost: { aud: 0 },
      transport: []
    }
  ],
  dayCost: { transport: 10, food: 165, activities: 55, accommodation: 250 }
},
{
  num: 10, date: "Wed, 3 Jun", title: "Departure Day", theme: "Farewell Melbourne",
  weather: { high: 13, low: 7, icon: "☁️", desc: "Cool, Overcast" },
  activities: [
    {
      time: "08:00", title: "Final Breakfast",
      type: "food",
      desc: "One last Melbourne breakfast. Walk to Degraves Street for a final flat white and avocado toast, or enjoy a quiet breakfast in your apartment kitchen.",
      atmosphere: ["relaxed"],
      img: "",
      map: "https://maps.google.com/?q=Degraves+Street+Melbourne",
      cost: { aud: 15, note: "A$12-18 pp" },
      transport: []
    },
    {
      time: "09:00", title: "Last-Minute Shopping or Coffee",
      type: "culture",
      desc: "If you missed anything: Aesop signature store on Flinders Lane (Melbourne-born skincare, great gifts), T2 Tea at Emporium (Australian tea brand), or the Block Arcade (heritage shopping arcade with Hopetoun Tea Rooms for scones).",
      atmosphere: ["relaxed", "local"],
      img: "",
      map: "https://maps.google.com/?q=Block+Arcade+Melbourne",
      cost: { aud: 0, note: "Free to browse" },
      transport: []
    },
    {
      time: "10:00", title: "Check Out of Collins House",
      type: "transport",
      desc: "Check-out by 10:00 AM. Store luggage at reception if needed. Final check: passport, boarding pass, Myki card (keep as souvenir!).",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Collins+House+Apartments+CLLIX+464+Collins+Street+Melbourne",
      cost: { aud: 0 },
      transport: []
    },
    {
      time: "10:15", title: "Uber to Melbourne Airport",
      type: "transport",
      desc: "Book Uber/DiDi from Collins House to Melbourne Airport Tullamarine Terminal 2. Allow 30-45 min for the drive. Aim to arrive ~10:45-11:00 for the 13:00 departure. Scoot counters open 3 hours before departure, close 60 min before.",
      atmosphere: [],
      img: "",
      map: "https://maps.google.com/?q=Melbourne+Airport+Tullamarine+Terminal+2",
      cost: { aud: 50, note: "A$45-60" },
      transport: [
        { mode: "Uber/DiDi", cost: "A$45-60", time: "30-40 min", note: "Midday, moderate traffic" },
        { mode: "SkyBus", cost: "A$49.80 (2 pax)", time: "30 min", note: "From Southern Cross Station. More luggage-friendly." }
      ]
    },
    {
      time: "11:00", title: "Arrive Airport & Check In",
      type: "transport",
      desc: "Terminal 2 for Scoot. Check in, drop bags, clear security and outbound immigration. Melbourne Airport has duty-free shopping and dining options airside.",
      atmosphere: ["busy"],
      img: "",
      map: "https://maps.google.com/?q=Melbourne+Airport+Tullamarine+Terminal+2",
      cost: { aud: 0 },
      transport: []
    },
    {
      time: "13:00", title: "Scoot TR59: Melbourne → Singapore",
      type: "transport",
      desc: "Depart Melbourne Tullamarine at 13:00. Boeing 787-9, 8h05m flight. Arrive Singapore Changi Terminal 1 at ~19:05 local time. Pre-book meals on the Scoot app. Welcome home.",
      atmosphere: [],
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Scoot_Boeing_787_%289V-OJF%29_at_Melbourne_International_Airport.jpg/960px-Scoot_Boeing_787_%289V-OJF%29_at_Melbourne_International_Airport.jpg",
      map: "https://maps.google.com/?q=Melbourne+Airport+Tullamarine+Terminal+2",
      cost: { aud: 0, note: "Pre-booked" },
      transport: []
    }
  ],
  dayCost: { transport: 50, food: 15, activities: 0, accommodation: 0 }
}
];

export const melbourne2026 = {
  id: "melbourne-2026",
  title: "Melbourne 2026",
  subtitle: "Coastal & Wildlife Adventure",
  emoji: "🦘",
  destination: "Melbourne, Australia",
  dates: { start: "2026-05-25", end: "2026-06-03" },
  travelers: 2,
  currency: { code: "AUD", symbol: "A$", rate: RATE, homeCurrency: "SGD", homeSymbol: "S$" },
  coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Twelve_Apostles_Port_Campbell_National_Park_Victoria_Australia.JPG/960px-Twelve_Apostles_Port_Campbell_National_Park_Victoria_Australia.JPG",
  theme: { primary: "#C5933A", sidebar: "#2C363F", surface: "#FAF6EE", card: "#FFFCF7" },
  days: DAYS,
  essentials: [
    { icon: "🎫", title: "Public Transport", value: "FREE May 25-31", detail: "All trains, trams, and buses across Victoria are completely free during the first 7 days of your trip. Jun 1-3: half price, daily cap A$5.70. Saves A$200+ over the trip." },
    { icon: "🌤️", title: "Weather", value: "8-15°C (Autumn)", detail: "Late May in Melbourne is autumn/early winter. Expect frequent showers and \"four seasons in one day.\" Pack warm layers, waterproof jacket, scarf, beanie, and comfortable walking shoes." }
  ],
  flights: {
    outbound: { airline: "Scoot", code: "TR58", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Scoot_logo.svg", from: "SIN T1", to: "MEL T2", depart: "02:30 SGT, 25 May", arrive: "11:45 AEST, 25 May", duration: "7h 15m", aircraft: "Boeing 787-9" },
    inbound: { airline: "Scoot", code: "TR59", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Scoot_logo.svg", from: "MEL T2", to: "SIN T1", depart: "13:00 AEST, 3 Jun", arrive: "19:05 SGT, 3 Jun", duration: "8h 05m", aircraft: "Boeing 787-9" }
  },
  accommodation: [
    {
      id: "collins-house", name: "Collins House by CLLIX", recommended: true,
      img: "https://ak-d.tripcdn.com/images/20031b000001a2ucn48BF_R_960_660_R5_D.jpg",
      address: "464 Collins St, Melbourne CBD", distance: "500m to city centre",
      price: "A$160-350/night", rating: "9.0/10 (Trip.com)",
      features: ["5 min walk to Flinders St Station", "In-unit washer & dryer", "Full kitchen, dishwasher", "Free WiFi, gym, BBQ terrace", "56-storey tower, built 2019", "Check-in 2pm / Check-out 10am"],
      badge: "Recommended", badgeColor: "",
      links: [
        { label: "Trip.com", url: "https://www.trip.com/hotels/melbourne-hotel-detail-48497470/arise-collins-house/" },
        { label: "Booking.com", url: "https://www.booking.com/hotel/au/collins-house-by-cllix.html" },
        { label: "Direct", url: "https://www.cllix.com/collins-house-apartments/" }
      ]
    },
    {
      id: "adina-flinders", name: "Adina on Flinders",
      img: "https://cf.bstatic.com/xdata/images/hotel/max500/558206743.jpg?k=955f840e0c74147d90aa0b68f2bf65a1db79aeeadb0343e658c8cf92320a4e28&o=",
      address: "88 Flinders St, Melbourne CBD", distance: "200m to city centre",
      price: "A$125-280/night", rating: "Highly rated (Booking.com)",
      features: ["2 min walk to Flinders St Station", "In-unit washer & dryer", "Full kitchen, high ceilings", "Heritage building, renovated 2023", "Supermarket on ground floor", "Check-in 2pm / Check-out 11am"],
      badge: "Best Location", badgeColor: "var(--ocean)",
      links: [
        { label: "Trip.com", url: "https://au.trip.com/hotels/melbourne-hotel-detail-2195146/adina-apartment-hotel-melbourne-on-flinders/" },
        { label: "Booking.com", url: "https://www.booking.com/hotel/au/adina-apartment-melbourne-flinders-street.html" }
      ]
    },
    {
      id: "oakwood-premier", name: "Oakwood Premier",
      img: "https://cf.bstatic.com/xdata/images/hotel/max500/349480071.jpg?k=caad30e24e3281bb44097ea7a106821f9d648e5bed8f524da36a08fd1f50a544&o=",
      address: "202 Normanby Rd, Southbank", distance: "1.5 km to city centre",
      price: "A$136-500/night", rating: "8.9/10 (Booking.com)",
      features: ["25 min walk to Flinders St", "In-unit washer & dryer (apt rooms)", "Full kitchen, Nespresso", "Rooftop bar, games room, gym", "40-storey tower, opened 2021", "Check-in 3pm / Check-out 11am"],
      badge: "", badgeColor: "",
      links: [
        { label: "Trip.com", url: "https://us.trip.com/hotels/southbank-hotel-detail-80947631/oakwood-premier-melbourne/" },
        { label: "Booking.com", url: "https://www.booking.com/hotel/au/oakwood-premier-melbourne.html" }
      ]
    },
    {
      id: "milano", name: "Milano Serviced Apartments",
      img: "https://cf.bstatic.com/xdata/images/hotel/max500/316022015.jpg?k=85cfdabe79a1c6d0ef09f4b0019608a9ae8cf6dcf3d77e4741c8afb68089d36d&o=",
      address: "8 Franklin St, Melbourne CBD", distance: "800m to city centre",
      price: "A$100-250/night", rating: "7.6/10 (Booking.com)",
      features: ["12 min walk to Flinders St", "In-unit washer & dryer", "Full kitchen, balcony", "Pool, sauna, cinema, tennis", "Near Queen Victoria Market", "Check-in 2pm / Check-out 10am"],
      badge: "Best Amenities", badgeColor: "var(--eucalyptus)",
      links: [
        { label: "Trip.com", url: "https://www.trip.com/hotels/melbourne-hotel-detail-735865/milano-serviced-apartments-melbourne/" },
        { label: "Booking.com", url: "https://www.booking.com/hotel/au/milano-serviced-apartments.html" }
      ]
    },
    {
      id: "quest-docklands", name: "Quest Docklands",
      img: "https://ak-d.tripcdn.com/images/0222u12000aqgeo3wA06D_R_960_660_R5_D.jpg",
      address: "750 Bourke St, Docklands", distance: "1.8 km to city centre",
      price: "A$80-200/night", rating: "8.7/10 (Booking.com)",
      features: ["7 min walk to Southern Cross", "In-unit washer & dryer", "Full kitchen, free WiFi", "Free tram zone, waterfront", "Near Marvel Stadium", "Check-in 2pm / Check-out 10am"],
      badge: "Best Value", badgeColor: "var(--eucalyptus)",
      links: [
        { label: "Trip.com", url: "https://au.trip.com/hotels/docklands-hotel-detail-6152120/quest-docklands-apartment-hotel-melbourne/" },
        { label: "Booking.com", url: "https://www.booking.com/hotel/au/quest-docklands-apartment.en-gb.html" }
      ]
    }
  ],
  checklist: [
    { group: "Must Book Ahead", items: [
      { id: "gor-tour", label: "Great Ocean Road Tour", links: [{ text: "Hit The Road Boutique Tours", url: "https://www.hittheroadtours.com.au/great-ocean-road-day-tour/" }, { text: "Trip.com alternatives", url: "https://au.trip.com/things-to-do/detail/97788736/" }], meta: "A$128/pp, max 12 guests" },
      { id: "penguin-parade", label: "Phillip Island Penguin Parade", links: [{ text: "Trip.com", url: "https://www.trip.com/things-to-do/detail/18181603/" }, { text: "Official", url: "https://bookings.penguins.org.au/" }], meta: "Underground viewing recommended" },
      { id: "puffing-billy", label: "Puffing Billy Railway", links: [{ text: "Trip.com", url: "https://us.trip.com/things-to-do/detail/89712170/" }, { text: "Official", url: "https://puffingbillyrailway.org.au/buy-tickets/" }], meta: "Must pre-book, no walk-ups" },
      { id: "hot-springs", label: "Peninsula Hot Springs", links: [{ text: "Trip.com", url: "https://au.trip.com/things-to-do/detail/37443146/" }, { text: "Official", url: "https://www.peninsulahotsprings.com/" }], meta: "Weekday Getaway for Two" },
      { id: "flower-drum", label: "Flower Drum", links: [{ text: "Book farewell dinner", url: "https://www.flowerdrum.melbourne/" }], meta: "Cantonese fine dining, Market Lane" },
      { id: "cutler-co", label: "Cutler & Co", links: [{ text: "Book Sunday supper", url: "https://www.cutlerandco.com.au/" }], meta: "Contemporary Australian, Gertrude St" },
      { id: "skybus", label: "SkyBus Airport Transfer", links: [{ text: "Trip.com", url: "https://www.trip.com/things-to-do/detail/58708483/" }], meta: "A$28/pp, MEL to Southern Cross Station" }
    ]},
    { group: "Good to Book / Walk-in OK", items: [
      { id: "skydeck", label: "Eureka Skydeck", links: [{ text: "Trip.com (from A$25)", url: "https://au.trip.com/things-to-do/detail/42459111/" }], meta: "15% off for online advance purchase" },
      { id: "sealife", label: "SEA LIFE Aquarium", links: [{ text: "Trip.com (from A$25)", url: "https://us.trip.com/things-to-do/detail/49163571/" }], meta: "Book online for discount vs gate price" },
      { id: "zoo", label: "Melbourne Zoo", links: [{ text: "zoo.org.au", url: "https://www.zoo.org.au/melbourne/" }], meta: "Book online for small discount" },
      { id: "tipo00", label: "Tipo 00", links: [{ text: "tipo00.com.au", url: "https://tipo00.com.au/" }], meta: "Walk-in possible, but book to skip the wait" },
      { id: "gimlet", label: "Gimlet", links: [{ text: "gimletmelbourne.com.au", url: "https://gimletmelbourne.com.au/" }], meta: "Andrew McConnell, CBD" },
      { id: "chin-chin", label: "Chin Chin", links: [], meta: "Walk-in only (no reservations)" },
      { id: "ngv-markets", label: "NGV, ACMI, Markets", links: [], meta: "No booking needed" }
    ]}
  ]
};
