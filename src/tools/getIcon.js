/**
 * getIcon(tags) → string
 *
 * Prend les propriétés d'un POI OpenStreetMap et retourne
 * le nom d'icône correspondant dans le sprite (sans le suffixe -11).
 *
 * Ex: getIcon({amenity: "restaurant"}) → "restaurant"
 *     Utilisable dans MapLibre: `icon-image: getIcon(tags) + "-11"`
 */

const AMENITY_ICONS = {
  // Restauration
  restaurant: 'restaurant',
  fast_food: 'fast-food',
  cafe: 'cafe',
  bar: 'bar',
  pub: 'beer',
  biergarten: 'beer',
  food_court: 'food-court',
  ice_cream: 'ice-cream',

  // Courses
  marketplace: 'grocery',
  fuel: 'fuel',
  vending_machine: '',

  // Santé
  hospital: 'hospital',
  clinic: 'hospital',
  doctors: 'doctor',
  dentist: 'dentist',
  pharmacy: 'pharmacy',
  veterinary: 'veterinary',

  // Éducation
  school: 'school',
  kindergarten: 'school',
  college: 'college',
  university: 'college',
  library: 'library',
  public_bookcase: 'library',
  childcare: 'school',

  // Transport
  parking: 'parking',
  parking_entrance: 'parking',
  parking_space: 'parking',
  bicycle_parking: 'parking-bike',
  bicycle_rental: 'bicycle-share',
  bus_station: 'bus',
  ferry_terminal: 'ferry',
  car_rental: 'car-rental',
  charging_station: 'fuel',
  taxi: 'car',
  car_sharing: 'car-rental',
  'kick-scooter_parking': '',

  // Services publics
  townhall: 'town-hall',
  police: 'police',
  fire_station: 'fire-station',
  post_office: 'post',
  post_box: 'post-box',
  courthouse: 'town-hall',
  prison: 'prison',
  embassy: 'embassy',

  // Loisirs
  theatre: 'theatre',
  cinema: 'cinema',
  nightclub: 'bar',
  casino: 'gaming',
  community_centre: 'building',
  arts_centre: 'art-gallery',
  social_facility: 'building',

  // Plein air
  bbq: 'bbq',
  bench: '',
  drinking_water: '',
  fountain: '',
  shelter: 'shelter',
  toilets: 'toilet',
  waste_basket: 'waste-basket',
  waste_disposal: 'waste-basket',
  recycling: 'recycling',

  // Divers
  bank: 'bank',
  atm: 'bank',
  bureau_de_change: 'bank',
  place_of_worship: 'place-of-worship',
  cemetery: 'cemetery',
  grave_yard: 'cemetery',
  telephone: 'telephone',
  driving_school: 'car',
  car_wash: 'car',
  motorcycle_parking: 'scooter',
  vehicle_inspection: 'car',
  music_school: 'music',
  dancing_school: 'music',
  language_school: 'school',
  clock: ''
}

const SHOP_ICONS = {
  // Alimentation
  bakery: 'bakery',
  butcher: 'slaughterhouse',
  confectionery: 'confectionery',
  convenience: 'convenience-store',
  greengrocer: 'grocery',
  grocery: 'grocery',
  supermarket: 'grocery',
  seafood: 'seafood',
  pastry: 'bakery',
  deli: 'grocery',
  wine: 'alcohol-shop',
  alcohol: 'alcohol-shop',

  // Mode / personne
  clothes: 'clothing-store',
  shoes: 'clothing-store',
  fashion: 'clothing-store',
  boutique: 'clothing-store',
  hairdresser: 'hairdresser',
  beauty: 'hairdresser',
  cosmetics: 'hairdresser',
  jewelry: 'jewelry-store',
  optician: 'optician',
  watch: 'watch',

  // Maison
  furniture: 'furniture',
  hardware: 'hardware',
  doityourself: 'hardware',
  garden_centre: 'garden-center',
  electronics: 'electronics',
  mobile_phone: 'mobile-phone',
  paint: 'paint',
  florist: 'florist',

  // Véhicules
  car: 'car',
  car_repair: 'car-repair',
  car_parts: 'car-repair',
  bicycle: 'bicycle',
  motorcycle: 'scooter',

  // Culture / loisirs
  books: 'library',
  stationery: 'stationery',
  gift: 'gift',
  music: 'music-shop',
  musical_instrument: 'music',
  toys: 'gift',
  sports: 'fitness',
  travel_agency: 'globe',
  pet: 'pet',
  laundry: 'laundry',

  // Autres courants
  tobacco: 'shop',
  newsagent: 'stationery',
  copyshop: 'stationery',
  dry_cleaning: 'laundry',
  tattoo: 'shop',
  massage: 'shop',
  cannabis: 'shop',
  second_hand: 'shop',
  hearing_aids: 'shop',
  interior_decoration: 'furniture',
  household_linen: 'bed',
  kitchen: 'furniture',
  funeral_directors: 'shop',
  games: 'gaming',
  variety_store: 'shop',
  nutrition_supplements: 'shop',
  storage_rental: 'shop'
}

const TOURISM_ICONS = {
  hotel: 'lodging',
  hostel: 'lodging',
  motel: 'lodging',
  guest_house: 'lodging',
  apartment: 'lodging',
  chalet: 'lodging',
  camp_site: 'campsite',
  caravan_site: 'campsite',
  alpine_hut: 'campsite',
  information: 'information',
  museum: 'museum',
  gallery: 'art-gallery',
  artwork: 'artwork',
  attraction: 'attraction',
  viewpoint: 'viewpoint',
  picnic_site: 'picnic-site',
  zoo: 'zoo',
  aquarium: 'aquarium',
  theme_park: 'amusement-park'
}

const LEISURE_ICONS = {
  park: 'park-alt1',
  garden: 'garden',
  playground: 'playground',
  dog_park: 'dog-park',
  pitch: 'soccer',
  sports_centre: 'stadium',
  sports_hall: 'stadium',
  fitness_centre: 'fitness',
  fitness_station: 'fitness',
  swimming_pool: 'swimming',
  swimming_area: 'swimming',
  golf_course: 'golf',
  horse_riding: 'horse-riding',
  marina: 'harbor',
  stadium: 'stadium',
  ice_rink: 'skiing',
  miniature_golf: 'golf',
  nature_reserve: 'park-alt1',
  picnic_table: 'picnic-site',
  bowling_alley: 'gaming',
  escape_game: 'escape'
}

const HEALTHCARE_ICONS = {
  hospital: 'hospital',
  clinic: 'hospital',
  doctor: 'doctor',
  dentist: 'dentist',
  pharmacy: 'pharmacy',
  physiotherapist: 'doctor',
  psychotherapist: 'doctor',
  laboratory: 'hospital',
  midwife: 'doctor',
  nursing_home: 'hospital',
  alternative: 'doctor',
  optometrist: 'optician'
}

const CRAFT_ICONS = {
  bakery: 'bakery',
  car_repair: 'car-repair',
  electrician: 'service',
  plumber: 'service',
  carpenter: 'service',
  painter: 'paint',
  jeweller: 'jewelry-store',
  shoemaker: 'shop',
  locksmith: 'shop',
  photographer: 'shop',
  key_cutter: 'shop',
  luthier: 'music',
  caterer: 'restaurant'
}

const OFFICE_ICONS = {
  estate_agent: 'building',
  company: 'building',
  lawyer: 'building',
  insurance: 'building',
  employment_agency: 'building',
  coworking: 'building',
  association: 'building',
  government: 'town-hall',
  political_party: 'town-hall',
  financial: 'bank',
  tax_advisor: 'building',
  architect: 'building',
  notary: 'building',
  accountant: 'building',
  it: 'building',
  yes: 'building'
}

const HISTORIC_ICONS = {
  castle: 'castle',
  monument: 'monument',
  memorial: 'monument',
  ruins: 'castle',
  archaeological_site: 'monument',
  fort: 'castle',
  palace: 'castle',
  manor: 'castle',
  church: 'place-of-worship',
  monastery: 'place-of-worship',
  wayside_cross: 'religious-christian',
  wayside_shrine: 'religious-christian',
  statue: 'monument',
  boundary_stone: 'monument'
}

const EMERGENCY_ICONS = {
  defibrillator: 'hospital',
  fire_hydrant: 'fire-station',
  phone: 'telephone'
}

// — Table de dispatch catégorie → mapping —
const ICON_MAPS = {
  amenity: AMENITY_ICONS,
  shop: SHOP_ICONS,
  tourism: TOURISM_ICONS,
  leisure: LEISURE_ICONS,
  healthcare: HEALTHCARE_ICONS,
  craft: CRAFT_ICONS,
  office: OFFICE_ICONS,
  historic: HISTORIC_ICONS,
  emergency: EMERGENCY_ICONS
}

// — Fallback par catégorie (quand la valeur n'est pas dans le mapping) —
const CATEGORY_FALLBACK = {
  amenity: 'circle',
  shop: 'shop',
  tourism: 'attraction',
  leisure: 'park-alt1',
  healthcare: 'doctor',
  craft: 'service',
  office: 'commercial',
  club: 'building',
  historic: 'monument',
  man_made: 'building',
  emergency: 'hospital'
}

// — Icônes sport pour leisure=pitch —
const SPORT_ICONS = {
  soccer: 'soccer',
  basketball: 'basketball',
  baseball: 'baseball',
  tennis: 'soccer',
  table_tennis: 'gaming',
  swimming: 'swimming',
  golf: 'golf',
  equestrian: 'horse-riding',
  skiing: 'skiing'
}

/**
 * Point d'entrée principal.
 *
 * @param {Object} tags - Propriétés du POI (feature.properties)
 * @returns {string} Nom d'icône sprite (sans suffixe -11)
 */
function getIcon (tags) {
  if (!tags) return 'circle'

  // ——————————————————————————————————
  // 1. Cas spéciaux
  // ——————————————————————————————————

  // Sport spécifique sur un terrain
  if (tags.sport && tags.leisure === 'pitch') {
    const sportIcon = SPORT_ICONS[tags.sport.split(';')[0]]
    if (sportIcon) return sportIcon
  }

  // ——————————————————————————————————
  // 2. Clé principale → icône
  // ——————————————————————————————————

  for (const key of KEY_PRIORITY) {
    if (tags[key]) {
      const map = ICON_MAPS[key]
      if (map) {
        const icon = map[tags[key]]
        if (icon) return icon
      }
      // Fallback catégorie
      return CATEGORY_FALLBACK[key] || 'circle'
    }
  }

  return 'circle'
}

function dictToMapLibreStyle (dict, key, defaultIcon) {
  return [
    'match', ['get', key],
    ...Object.entries(dict).flatMap(([k, icon]) => [k, `${icon}-11`]),
    defaultIcon
  ]
}

export const poiIconExpression = [
  'case',
  ['has', 'tourism'], dictToMapLibreStyle(TOURISM_ICONS, 'tourism', 'attraction-11'),
  ['has', 'amenity'], dictToMapLibreStyle(AMENITY_ICONS, 'amenity', 'marker-11'),
  ['has', 'shop'], dictToMapLibreStyle(SHOP_ICONS, 'shop', 'shop-11'),
  ['has', 'leisure'], dictToMapLibreStyle(LEISURE_ICONS, 'leisure', 'park-alt1-11'),
  ['has', 'healthcare'], dictToMapLibreStyle(HEALTHCARE_ICONS, 'healthcare', 'doctor-11'),
  ['has', 'craft'], dictToMapLibreStyle(CRAFT_ICONS, 'craft', 'service-11'),
  ['has', 'office'], dictToMapLibreStyle(OFFICE_ICONS, 'office', 'building-11'),
  ['has', 'historic'], dictToMapLibreStyle(HISTORIC_ICONS, 'historic', 'monument-11'),
  ''
]
