document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const links = document.querySelectorAll(".menu-link");

    const pages = {
        startsida: `<section>
                      <h2>Välkommen till BRF Hinden</h2>
                      <div id="aktuellt">
                        <h3>Aktuellt</h3>
                        <div class="aktuellt-item">
                          <h3>15 februari 2025</h3>
                          <p>Stämma för alla medlemmar kl. 18:00 i föreningslokalen.</p>
                        </div>
                        <div class="aktuellt-item">
                          <h3>1 mars 2025</h3>
                          <p>Påbörjad renovering av fasad.</p>
                        </div>
                        <div class="aktuellt-item">
                          <h3>15 mars 2025</h3>
                          <p>Installationsarbete för nya laddstationer.</p>
                        </div>
                      </div>
                   </section>`,
        kontakt: `<section>
                    <h2>Kontakta oss</h2>
                    <form id="contact-form" class="contact-form">
                        <input type="text" name="name" placeholder="Ditt namn" required>
                        <input type="email" name="email" placeholder="Din e-post" required>
                        <textarea name="message" rows="5" placeholder="Ditt meddelande" required></textarea>
                        <button type="submit">Skicka</button>
                    </form>
                  </section>`,
        styrelsen: `<section>
                      <h2>Styrelsen</h2>
                      <ul>
                          <li><strong>Gunnar Hundal:</strong> Ordförande</li>
                          <li><strong>Maria Jansson:</strong> Sekreterare</li>
                          <li><strong>Ulf Sjöberg:</strong> Ledamot</li>
                          <li><strong>Anna-Liisa Söderlund:</strong> Ledamot</li>
                          <li><strong>Dennis Åkergren:</strong> Ledamot</li>
                          <li><strong>Gunnar Ljungsten:</strong> Ledamot utsedd av HSB Mälardalarna</li>
                      </ul>
                  </section>`,
        "om-foreningen": `<section>
                            <h2>Om föreningen</h2>
                            <p>Föreningen som har sitt säte i Lindesberg äger fastigheten Kyrkberget 7:3, 7:4, i Lindesberg som byggdes år 1962.</p>
                            <p>På fastigheten finns tre bostadshus med tillsammans nio trapphus med adresserna Bondskogsvägen 39-43, Lindesberg.</p>
                            <p>Föreningens 82 bostäder fördelar sig enligt följande:</p>
                            <ul>
                                <li>15 lgh 1 rok: 28,5-39,5 m²</li>
                                <li>45 lgh 2 rok: 56,5-61,5 m²</li>
                                <li>22 lgh 3 rok: 69,5-79,0 m²</li>
                            </ul>
                            <p>Lägenhetsyta: 4 771 m²</p>
                            <p>Övriga utrymmen:</p>
                            <ul>
                                <li>Hyresrättslokaler: 5 st</li>
                                <li>Garage: 17 st</li>
                                <li>P-platser: 21 st</li>
                                <li>Permobilgarage: 1 st</li>
                            </ul>
                          </section>`,
        utveckling: `<section>
                        <h2>Utveckling</h2>
                        <p>De senaste åren har föreningen gjort följande större underhållsåtgärder och investeringar i fastigheten:</p>
                        <ul>
                            <li>Renovering balkonger (2004)</li>
                            <li>Isolering vind (2010)</li>
                            <li>Bredbandsinstallation (2010)</li>
                            <li>Byte av taktegel 43:an (2011)</li>
                            <li>Nya ventiler kök/bad (2013)</li>
                            <li>Utvändig målning (2014)</li>
                            <li>OVK-besiktning (2014)</li>
                            <li>Lägenhetsdörrar (2015)</li>
                            <li>Passersystem (2015)</li>
                            <li>Fjärrvärmeväxlare (2016)</li>
                            <li>Fönster (2019)</li>
                            <li>Laddstolpar (2024)</li>
                        </ul>
                     </section>`
    };

    const loadPage = (hash) => {
        let page = hash.replace("#", "");
        if (!page || !pages[page]) {
            page = "startsida";
            history.replaceState(null, "", "#startsida");
        }
        contentDiv.innerHTML = pages[page];

        if (page === "kontakt") {
            const contactForm = document.getElementById("contact-form");

            contactForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(contactForm);

                const response = await fetch("https://formspree.io/f/xkgozrgo", {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    alert("Tack! Ditt meddelande har skickats.");
                    contactForm.reset();
                } else {
                    alert("Det gick inte att skicka ditt meddelande. Försök igen senare.");
                }
            });
        }
    };

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const hash = e.target.getAttribute("href");
            loadPage(hash);
            history.pushState(null, "", hash);
        });
    });

    window.addEventListener("popstate", () => {
        loadPage(location.hash);
    });

    loadPage(location.hash || "#startsida");
});
