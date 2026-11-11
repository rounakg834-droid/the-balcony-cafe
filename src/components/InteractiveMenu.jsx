import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Coffee, Pizza, Utensils, Cake, Sparkles, Flame, Check, ArrowRight } from 'lucide-react';
import CoffeeBean3D from './CoffeeBean3D';
import { getAssetUrl } from '../constants/images';

const CATEGORIES = [
  { id: 'coffee', label: 'Coffee & Beverages', icon: Coffee },
  { id: 'starters', label: 'Starters', icon: Sparkles },
  { id: 'pizza-pasta', label: 'Pizza & Pasta', icon: Pizza },
  { id: 'main-course', label: 'Main Course', icon: Utensils },
  { id: 'desserts', label: 'Desserts', icon: Cake },
];

const MENU_ITEMS = {
  coffee: [
    {
      id: 'c1',
      title: 'Balcony House Pour-Over',
      subtitle: 'Single-Origin Arabica',
      description: 'Hand-poured slow extraction highlighting bright floral notes, clean citrus acidity, and a smooth caramel finish.',
      tag: 'Roaster’s Choice',
      image: getAssetUrl('assets/images/unnamed (10).webp'),
      notes: 'Brewed to order &bull; Hot or Iced',
    },
    {
      id: 'c2',
      title: 'Velvet Flat White',
      subtitle: 'Double Ristretto & Microfoam',
      description: 'Full-bodied double ristretto pulled through silky, micro-textured whole milk with delicate latte art.',
      tag: 'House Classic',
      image: null,
      notes: 'Double Shot &bull; Oat / Almond Milk Available',
    },
    {
      id: 'c3',
      title: 'Spanish Caramel Latte',
      subtitle: 'Condensed Milk & Espresso',
      description: 'Rich dark espresso layered over sweet condensed milk and caramel drizzle, topped with velvety steamed milk.',
      tag: 'Sweet Comfort',
      image: null,
      notes: 'Signature Sweet &bull; Highly Recommended',
    },
    {
      id: 'c4',
      title: 'Cold Brew on Tap',
      subtitle: '18-Hour Slow Steep',
      description: 'Coarsely ground specialty beans steeped in chilled filtered water for 18 hours, yielding an ultra-smooth, low-acid brew.',
      tag: 'Chilled Craft',
      image: null,
      notes: 'Crisp &bull; Served over clear ice rock',
    },
  ],
  starters: [
    {
      id: 's1',
      title: 'Mediterranean Mezze Platter',
      subtitle: 'Creamy Hummus & Golden Falafel',
      description: 'Silky whipped chickpea hummus, crispy herb falafel, warm stone-baked pita, sliced avocado, kalamata olives, and feta.',
      tag: 'Chef’s Signature',
      image: getAssetUrl('assets/images/unnamed.webp'),
      notes: 'Perfect for Sharing &bull; Fresh Herbs',
    },
    {
      id: 's2',
      title: 'Crispy Fries with House Truffle Mayo',
      subtitle: 'Hand-Cut Golden Potatoes',
      description: 'Skin-on golden potatoes fried to a crisp crunch, dusted with sea salt and rosemary, served with house garlic truffle dip.',
      tag: 'Crowd Favorite',
      image: null,
      notes: 'Crisp & Savoury &bull; Dip Included',
    },
    {
      id: 's3',
      title: 'Stuffed Bruschetta Rustica',
      subtitle: 'Toasted Sourdough & Confit Garlic',
      description: 'Grilled crusty sourdough topped with slow-roasted cherry tomatoes, torn sweet basil, virgin olive oil, and balsamic glaze.',
      tag: 'Vegetarian',
      image: null,
      notes: 'Light & Crunchy &bull; Artisanal Bread',
    },
  ],
  'pizza-pasta': [
    {
      id: 'pp1',
      title: 'Farmhouse Hearth Pizza',
      subtitle: 'Charred Thin Crust & Mozzarella',
      description: 'Hand-stretched sourdough base topped with rich San Marzano tomato sauce, sautéed mushrooms, bell peppers, olives, and melted mozzarella.',
      tag: 'Stone Oven Baked',
      image: getAssetUrl('assets/images/unnamed (7).webp'),
      notes: 'Made Fresh &bull; Thin & Crispy',
    },
    {
      id: 'pp2',
      title: 'Spaghetti Aglio e Olio',
      subtitle: 'Garlic, Chili Flakes & Herb Cutlet',
      description: 'Al dente spaghetti tossed with golden toasted garlic slivers, chili flakes, Italian flat-leaf parsley, and pure extra virgin olive oil.',
      tag: 'Italian Classic',
      image: getAssetUrl('assets/images/unnamed (3).webp'),
      notes: 'Twirled Fresh &bull; Olive Oil Emulsion',
    },
    {
      id: 'pp3',
      title: 'Penne Arrabiata al Forno',
      subtitle: 'Slow-Cooked Spicy Tomato',
      description: 'Penne pasta tossed in a robust fiery tomato and garlic sugo with fresh basil leaves, finished with grated parmesan.',
      tag: 'Spicy Comfort',
      image: null,
      notes: 'Vegetarian &bull; Parmesan Crown',
    },
  ],
  'main-course': [
    {
      id: 'm1',
      title: 'Herb-Crusted Cutlet & Aglio Olio',
      subtitle: 'Pan-Seared with Garlic Pasta',
      description: 'Succulent seasoned cutlet seared with herbs and butter, served over a bed of garlic spaghetti and house cream sauce.',
      tag: 'House Specialty',
      image: getAssetUrl('assets/images/unnamed (3).webp'),
      notes: 'Complete Meal &bull; Chef Recommended',
    },
    {
      id: 'm2',
      title: 'Grilled Cottage Cheese Steak',
      subtitle: 'Herb Marinade & Warm Grains',
      description: 'Char-grilled artisanal paneer steak infused with chimichurri herbs, accompanied by sautéed greens and roasted baby potatoes.',
      tag: 'Vegetarian Feast',
      image: null,
      notes: 'High Protein &bull; Fresh Greens',
    },
  ],
  desserts: [
    {
      id: 'd1',
      title: 'Artisanal Bakery Bakes & Breads',
      subtitle: 'Fresh Daily from our Bakery Counter',
      description: 'Daily rotating selection of butter croissants, cinnamon buns, tea cakes, and seasonal cookies baked in-house.',
      tag: 'Fresh from Oven',
      image: getAssetUrl('assets/images/unnamed (10).webp'),
      notes: 'Ask Barista for Today’s Showcase',
    },
    {
      id: 'd2',
      title: 'Basque Burnt Cheesecake',
      subtitle: 'Caramelized Crust & Creamy Center',
      description: 'Traditional Spanish cheesecake baked at high heat for a deep caramelized exterior and a velvety, melt-in-mouth core.',
      tag: 'House Favorite',
      image: null,
      notes: 'Pair with Espresso or Flat White',
    },
    {
      id: 'd3',
      title: 'Dark Chocolate Ganache Tart',
      subtitle: '70% Belgian Cocoa & Sea Salt',
      description: 'Crisp cocoa shortcrust pastry shell filled with decadent dark chocolate ganache, finished with Maldon sea salt flakes.',
      tag: 'Decadent',
      image: null,
      notes: 'Pure Cocoa &bull; Subtle Salt Balance',
    },
  ],
};

export default function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const itemsGridRef = useRef(null);

  // Category change animation
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    if (itemsGridRef.current) {
      gsap.fromTo(
        itemsGridRef.current.children,
        { opacity: 0, y: 28, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [activeCategory]);

  const currentItems = MENU_ITEMS[activeCategory] || [];

  return (
    <section id="menu" className="py-28 sm:py-36 bg-[#FAF7F0] relative overflow-hidden border-t border-beige/60">
      {/* Decorative 3D Coffee Beans in corner */}
      <div className="absolute top-12 right-12 opacity-30 pointer-events-none hidden md:block">
        <CoffeeBean3D size={38} rotate={30} />
      </div>
      <div className="absolute bottom-16 left-12 opacity-25 pointer-events-none hidden md:block">
        <CoffeeBean3D size={45} rotate={-45} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <div className="editorial-badge mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>Curated Culinary Selection</span>
          </div>
          <h2 className="editorial-heading text-3xl sm:text-4xl md:text-5xl font-serif">
            Artisanal Dining & Brews
          </h2>
          <p className="mt-4 text-cafeDark/75 font-sans text-sm sm:text-base leading-relaxed">
            Prepared with fresh local ingredients, single-origin roasts, and unhurried culinary dedication at The Balcony Cafe, Jalandhar.
          </p>
        </div>

        {/* Animated Category Navigation Tabs with Smooth Active Indicator */}
        <div className="flex justify-center mb-14 overflow-x-auto pb-4 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-full bg-white/80 border border-beige shadow-sm backdrop-blur-md gap-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-coffee text-ivory shadow-md scale-102'
                      : 'text-cafeDark/75 hover:text-coffee hover:bg-beige/30'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-caramel-light' : 'text-caramel'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Items Grid */}
        <div
          ref={itemsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl p-6 sm:p-7 glass-card-warm border border-beige/80 transition-all duration-400 hover:shadow-luxury-lg hover:-translate-y-1.5 flex flex-col sm:flex-row gap-5 items-start will-change-transform"
              style={{
                perspective: 1000,
              }}
            >
              {/* Optional Photo Spotlight (ONLY local photos) */}
              {item.image ? (
                <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0 border border-beige/70 bg-beige/30 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              ) : (
                /* Elegant Typography Icon Placeholder when no photo is needed */
                <div className="w-14 h-14 rounded-2xl bg-caramel/10 border border-caramel/20 flex items-center justify-center text-caramel shrink-0 group-hover:bg-caramel/20 transition-colors">
                  <Coffee className="w-6 h-6" />
                </div>
              )}

              {/* Card Details */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-ultra text-caramel">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-sans text-coffee font-medium italic">
                      Freshly Prepared
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-cafeDark group-hover:text-coffee transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-cafeDark/60 mb-2 italic">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-cafeDark/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="mt-4 pt-3 border-t border-beige/60 flex items-center justify-between text-xs font-sans">
                  <span
                    className="text-cafeDark/65 text-[11px]"
                    dangerouslySetInnerHTML={{ __html: item.notes }}
                  />
                  <a
                    href="#visit"
                    className="text-coffee font-semibold hover:text-caramel transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Order at Table</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Note & Visit Callout */}
        <div className="mt-16 p-8 rounded-3xl glass-card border border-beige/80 text-center max-w-3xl mx-auto shadow-sm">
          <p className="font-serif text-lg text-cafeDark font-medium">
            "Every dish and roast is crafted fresh upon order in our open kitchen & espresso bar."
          </p>
          <p className="text-xs text-cafeDark/70 mt-2 font-sans">
            Please inform our service team about any specific dietary preferences or allergies during your visit.
          </p>
          <div className="mt-5">
            <a
              href="#visit"
              className="btn-primary text-xs !py-2.5 !px-6 shadow-sm"
            >
              <span>Visit The Balcony Cafe Today</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
