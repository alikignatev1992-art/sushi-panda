// Автогенерировано из 01-research/sushi-panda-vk/vk-community-data.md (цены VK, 22.07.2026)
// Фото: public/photos (собраны из Товаров сообщества). Составы — только подтверждённые.
export type Product = {
  slug: string
  name: string
  cat: string
  price: number
  img: string
  desc?: string
}

export const CATEGORIES = ["Сеты", "Роллы", "Запечённые роллы", "Закуски и соусы", "Добавки"] as const

export const PRODUCTS: Product[] = [
  { slug: "set-schislivyy-aktsiya", name: "Сет Щисливый(Акция)", cat: "Сеты", price: 990, img: "/photos/set-schislivyy-aktsiya.jpg" },
  { slug: "set-ipontskiy", name: "Сет Ипонцкий", cat: "Сеты", price: 1580, img: "/photos/set-ipontskiy.jpg" },
  { slug: "set-figachcho", name: "Сет Фигаччо", cat: "Сеты", price: 1580, img: "/photos/set-figachcho.jpg" },
  { slug: "set-los-kurochkas", name: "Сет Лос-Курочкас", cat: "Сеты", price: 1620, img: "/photos/set-los-kurochkas.jpg" },
  { slug: "set-more-moryushko", name: "Сет Морэ-морюшко", cat: "Сеты", price: 1640, img: "/photos/set-more-moryushko.jpg" },
  { slug: "set-los-lososyas-aktsiya", name: "Сет Лос-Лососяс(Акция)", cat: "Сеты", price: 1690, img: "/photos/set-los-lososyas-aktsiya.jpg" },
  { slug: "set-ostrov-sokrovisch-aktsiya", name: "Сет Остров Сокровищ(Акция)", cat: "Сеты", price: 1690, img: "/photos/set-ostrov-sokrovisch-aktsiya.jpg" },
  { slug: "set-malibushechki", name: "Сет Малибушечки", cat: "Сеты", price: 1880, img: "/photos/set-malibushechki.jpg" },
  { slug: "set-seyshely", name: "Сет Сейшелы", cat: "Сеты", price: 1890, img: "/photos/set-seyshely.jpg" },
  { slug: "set-sunduk-deyvi-dzhonsa", name: "Сет Сундук Дэйви Джонса", cat: "Сеты", price: 1890, img: "/photos/set-sunduk-deyvi-dzhonsa.jpg" },
  { slug: "set-tolko-ryba", name: "Сет Только рыба", cat: "Сеты", price: 1890, img: "/photos/set-tolko-ryba.jpg" },
  { slug: "set-na-paru-palok", name: "Сет На Пару Палок", cat: "Сеты", price: 1910, img: "/photos/set-na-paru-palok.jpg" },
  { slug: "set-goryachiy", name: "Сет Горячий", cat: "Сеты", price: 1950, img: "/photos/set-goryachiy.jpg" },
  { slug: "set-rybka-moya", name: "Сет Рыбка моя", cat: "Сеты", price: 1950, img: "/photos/set-rybka-moya.jpg" },
  { slug: "set-fishka", name: "Сет Фишка", cat: "Сеты", price: 2010, img: "/photos/set-fishka.jpg" },
  { slug: "set-ulybayka", name: "Сет Улыбайка", cat: "Сеты", price: 2050, img: "/photos/set-ulybayka.jpg" },
  { slug: "set-o-pushka", name: "Сет О!Пушка", cat: "Сеты", price: 2060, img: "/photos/set-o-pushka.jpg" },
  { slug: "set-sterlibum", name: "Сет Стерлибум", cat: "Сеты", price: 2190, img: "/photos/set-sterlibum.jpg" },
  { slug: "set-osen-vkusno", name: "Сет Осень Вкусно", cat: "Сеты", price: 2490, img: "/photos/set-osen-vkusno.jpg" },
  { slug: "set-pod-palmami", name: "Сет Под Пальмами", cat: "Сеты", price: 2490, img: "/photos/set-pod-palmami.jpg" },
  { slug: "set-pribambas", name: "Сет Прибамбас", cat: "Сеты", price: 2520, img: "/photos/set-pribambas.jpg" },
  { slug: "set-agon", name: "Сет Агонь", cat: "Сеты", price: 2640, img: "/photos/set-agon.jpg" },
  { slug: "kaliforniya", name: "Калифорния", cat: "Роллы", price: 295, img: "/photos/kaliforniya.jpg", desc: "Краб, авокадо, огурец, икра тобико" },
  { slug: "unagi", name: "Унаги", cat: "Роллы", price: 300, img: "/photos/unagi.jpg", desc: "Угорь, сливочный сыр, огурец, соус унаги" },
  { slug: "tsezar", name: "Цезарь", cat: "Роллы", price: 310, img: "/photos/tsezar.jpg" },
  { slug: "alyaska", name: "Аляска", cat: "Роллы", price: 320, img: "/photos/alyaska.jpg" },
  { slug: "ebi-krim", name: "Эби крим", cat: "Роллы", price: 320, img: "/photos/ebi-krim.jpg" },
  { slug: "filadelfiya-bonito", name: "Филадельфия бонито", cat: "Роллы", price: 345, img: "/photos/filadelfiya-bonito.jpg" },
  { slug: "lososik", name: "Лососик", cat: "Роллы", price: 350, img: "/photos/lososik.jpg" },
  { slug: "syake-grin", name: "Сяке грин", cat: "Роллы", price: 355, img: "/photos/syake-grin.jpg" },
  { slug: "kaliforniya-s-lososem", name: "Калифорния с лососем", cat: "Роллы", price: 360, img: "/photos/kaliforniya-s-lososem.jpg", desc: "Лосось, краб, авокадо, огурец, тобико" },
  { slug: "filadelfiya-layt", name: "Филадельфия Лайт", cat: "Роллы", price: 390, img: "/photos/filadelfiya-layt.jpg" },
  { slug: "hrenoff-hot", name: "Хренoff хот", cat: "Запечённые роллы", price: 315, img: "/photos/hrenoff-hot.jpg" },
  { slug: "babl-hot", name: "Бабл хот", cat: "Запечённые роллы", price: 320, img: "/photos/babl-hot.jpg" },
  { slug: "kaliforniya-hot", name: "Калифорния хот", cat: "Запечённые роллы", price: 320, img: "/photos/kaliforniya-hot.jpg" },
  { slug: "pinki-hot", name: "Пинки хот", cat: "Запечённые роллы", price: 320, img: "/photos/pinki-hot.jpg" },
  { slug: "chiken-chiz-hot", name: "Чикен чиз хот", cat: "Запечённые роллы", price: 320, img: "/photos/chiken-chiz-hot.jpg" },
  { slug: "karbonara-hot", name: "Карбонара хот", cat: "Запечённые роллы", price: 330, img: "/photos/karbonara-hot.jpg" },
  { slug: "myatnyy-ananas-hot", name: "Мятный ананас хот", cat: "Запечённые роллы", price: 330, img: "/photos/myatnyy-ananas-hot.jpg" },
  { slug: "tar-tar-hot", name: "Тар-тар хот", cat: "Запечённые роллы", price: 330, img: "/photos/tar-tar-hot.jpg" },
  { slug: "tyscha-hot", name: "Тыща хот", cat: "Запечённые роллы", price: 330, img: "/photos/tyscha-hot.jpg" },
  { slug: "chiken-ananas-hot", name: "Чикен ананас хот", cat: "Запечённые роллы", price: 330, img: "/photos/chiken-ananas-hot.jpg" },
  { slug: "shampi-hot", name: "Шампи хот", cat: "Запечённые роллы", price: 335, img: "/photos/shampi-hot.jpg" },
  { slug: "anti-hot", name: "Анти хот", cat: "Запечённые роллы", price: 345, img: "/photos/anti-hot.jpg" },
  { slug: "konopatyy-dzho-hot", name: "Конопатый Джо хот", cat: "Запечённые роллы", price: 345, img: "/photos/konopatyy-dzho-hot.jpg" },
  { slug: "luni-hot", name: "Луни хот", cat: "Запечённые роллы", price: 345, img: "/photos/luni-hot.jpg" },
  { slug: "skorpion-hot", name: "Скорпион хот", cat: "Запечённые роллы", price: 355, img: "/photos/skorpion-hot.jpg" },
  { slug: "ebi-krim-hot", name: "Эби крим хот", cat: "Запечённые роллы", price: 355, img: "/photos/ebi-krim-hot.jpg" },
  { slug: "zyuzya-hot", name: "Зюзя хот", cat: "Запечённые роллы", price: 380, img: "/photos/zyuzya-hot.jpg" },
  { slug: "fifochka-hot", name: "Фифочка хот", cat: "Запечённые роллы", price: 380, img: "/photos/fifochka-hot.jpg" },
  { slug: "lososik-hot", name: "Лососик Хот", cat: "Запечённые роллы", price: 385, img: "/photos/lososik-hot.jpg" },
  { slug: "syake-grin-hot", name: "Сяке Грин Хот", cat: "Запечённые роллы", price: 385, img: "/photos/syake-grin-hot.jpg" },
  { slug: "kaliforniya-s-lososem-hot", name: "Калифорния с лососем хот", cat: "Запечённые роллы", price: 395, img: "/photos/kaliforniya-s-lososem-hot.jpg" },
  { slug: "filadelfiya-slay-hot", name: "Филадельфия слай хот", cat: "Запечённые роллы", price: 410, img: "/photos/filadelfiya-slay-hot.jpg" },
  { slug: "ketchup", name: "Кетчуп", cat: "Закуски и соусы", price: 30, img: "/photos/ketchup.jpg" },
  { slug: "sous-kislo-sladkiy", name: "Соус Кисло-сладкий", cat: "Закуски и соусы", price: 30, img: "/photos/sous-kislo-sladkiy.jpg" },
  { slug: "sous-syrnyy", name: "Соус Сырный", cat: "Закуски и соусы", price: 30, img: "/photos/sous-syrnyy.jpg" },
  { slug: "sous-tar-tar", name: "Соус Тар-тар", cat: "Закуски и соусы", price: 50, img: "/photos/sous-tar-tar.jpg" },
  { slug: "sous-tsezar", name: "Соус Цезарь", cat: "Закуски и соусы", price: 50, img: "/photos/sous-tsezar.jpg" },
  { slug: "kartofel-fri", name: "Картофель Фри", cat: "Закуски и соусы", price: 180, img: "/photos/kartofel-fri.jpg", desc: "Хрустящий картофель, порция 180 г" },
  { slug: "naggetsy-6sht", name: "Наггетсы 6шт", cat: "Закуски и соусы", price: 180, img: "/photos/naggetsy-6sht.jpg", desc: "Куриные наггетсы, 6 штук" },
  { slug: "naggetsy-9sht", name: "Наггетсы 9шт", cat: "Закуски и соусы", price: 250, img: "/photos/naggetsy-9sht.jpg", desc: "Куриные наггетсы, 9 штук" },
  { slug: "palochki", name: "Палочки", cat: "Добавки", price: 10, img: "/photos/palochki.jpg" },
  { slug: "vasabi", name: "Васаби", cat: "Добавки", price: 30, img: "/photos/vasabi.jpg" },
  { slug: "imbir", name: "Имбирь", cat: "Добавки", price: 30, img: "/photos/imbir.jpg" },
  { slug: "soevyy-sous", name: "Соевый соус", cat: "Добавки", price: 30, img: "/photos/soevyy-sous.jpg" },
]

export const bySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug)
export const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽"
