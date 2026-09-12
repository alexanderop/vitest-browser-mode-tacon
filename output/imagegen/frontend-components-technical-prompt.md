# Technical component testing illustration

Tool: built-in image_gen, editing the previous component illustration.
Asset: `starter/public/memes/frontend-components-technical.png`.

Edit the supplied conference slide into a more technical, clean software engineering diagram. Keep the 16:9 format, dark navy #212737 background, off-white typography and pink #ff6bed accents. Retain the German title "Im Frontend testen wir Komponenten" and subtitle "Vue / React: Logik, Zustand und DOM". REMOVE ALL Hamcrab characters, all hamsters, all crabs including plush toys, all mascots, people, desks, plants, furniture, decorative scenes. Replace cartoons with precise flat technical diagrams, subtle outlines and understated panels. No glossy 3D, no neon glow. Large readable typography for projection.
Two equal columns headed "Isoliert" and "Integriert".
LEFT technical flow: small node "Props" above a central component boundary "ProductCard" with a downward arrow into it. Within ProductCard show three simple rows "Logik", "Zustand", "DOM", and a minimal DOM button labeled "Kaufen". A cursor with label "Klick" points at the button. Arrow from component to output node "Event / Callback". Beneath left caption "Reagiert die Komponente auf den Klick?" Note event/callback represents the public output in Vue/React, not testing a private method. No code snippets.
RIGHT technical flow: boundary labeled "Shop" encloses three separate nodes "ProductCard", "Warenkorb-State", "Cart". Connect left-to-right ProductCard → Warenkorb-State → Cart. Label first arrow "Kaufaktion", second "Update". Under ProductCard show minimal button "Kaufen"; under Cart show minimal DOM readout "1 Artikel". Show no direct ProductCard to Cart arrow. Beneath right caption "Aktualisiert sich der sichtbare Warenkorb?"
Footer sentence exactly "Komponententests können isoliert oder integriert sein."
Keep the main purpose: same component can be tested alone or in collaboration, no extra testing pyramid tier, no test environment claims. Text must be crisp, correct German, exact case. Make layout visually calm and technically clear with plenty of breathing room. No animals anywhere, no extra microtext, no watermark.
