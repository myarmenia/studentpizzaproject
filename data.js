import bcrypt from "bcrypt";

export const data = [
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/bcbd/4371/fe81d3a3ec638fb078b2122eed2d7420?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wg4yzTpBcSZHf3rwdGzxOOMkpMRXuhmGBZSbz3Kun60Qci8ipjrER61TYSjT65U-ZOvA9oR7UDO84jfBW8MdgQtHJShO4BfNk9oNMkUFx8hKNIWx19TGepfuiSFOcLpvoj8osFA-Q3Ay7kbTuEVzBhEq3FRmKthCDGuX~-xXGXaxzFXrdV4t7bezeHPseThQEDN7g161axTsSAdHbfVzuEkkjaTNcNY1lZrG-ekBS~nL8KRLa-FjgEFsRG3Q5ciixdR~JbmWDdij8J75v1SVQkB2U9eHp0~mieU8q4Sg3zBJAjHs3LjdnJ6N6IVuAl-TSV0s-1jK69wWFfMcBwVfKg__",
    title: "Пепперони Фреш с перцем",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 803,
    category: 2,
    rating: 4,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/2997/9ae7/4b2dd8c255833c6c0db221da6a5b3fae?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CludioUlzY8k0Vi~YQg0Y6LNRAG-Ae4aBcaWISw889bR~W4xARPykAmH9Hj8QlwkhGmnOd5Ow6VPTr3HYW9pRtyTuKVAMvcv-7kKiMRhNBBXm~C0CBNzXHyWWMBQd7PMF8uOiiYWXCv1DkeKpUxU19K4dT2gS45xj6juqE6UQx76HK-5afkFjrcZAwDTFQ-tk46VYzyBhXjFVpw~zl0bC~pPDqmalO~ebLzTKqdAtOnBNIFWpnC7WYqO-6oibLA6SNwFj-M7-ehgNppqb7GxUVsD9bhzKPobTQmb6irN92obJIa6hRTYtH7qJoXDsLyokam~yJrd2DaK-cUw95Qf9g__",
    title: "Сырная",
    types: [0],
    sizes: [26, 40],
    price: 245,
    category: 3,
    rating: 6,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/94bc/0f13/3837f2e7162797b5233b5520d2f5ea7c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VuzxztMSv4UJ1HPhMiepxCtUhXQf0Og~Rdx014jH2thKmE8w0Awf9rL52QFJlr2NSF5R-u83~X6seYZJHn91CwNA7K4eO5DTV5F-26ShJBbnIAUbbl~QBnkOY1vEfwsrR~EHcC3GUOfdwPKpemJ31vQ3F3FIiUZpvy37SqMZief9MR~aM6IOaIl46zePmV9WTY5UZ8cNbnbLQ0N3GP-ZvNm6HocnLVLpBT6O5~~c~mROsa0TeOYvXFrbIAKQ05S8gaYT7b95yd0-butDn0MzZB2~ro0CDVr9ougazHi7vnvj~F~SBuI5k0CiVY34IUFckdVLvUHK5grZ5L0StziAcw__",
    title: "Цыпленок барбекю",
    types: [0],
    sizes: [26, 40],
    price: 295,
    category: 1,
    rating: 4,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/ca9b/e23e/3d44180b3596e4c86e6b3c3bf2fdc984?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k7JuKdR7ASmmQM-S4FU6yuybgxBkx6hZNA7f81IM47x-trqjL69aJkAjYKMnxzgGmPoH9tX79ZilfVOvIFcb3kxyxeazr97z4JEI9fKN-I0CydMXo30zBNsexx6IF~Dm8RXNPKJadeeuFHZak7hLzdMywebjLlCzULRYg9ajnb8RfqadTlJ-OtNvRFVbbBFeFZpjP6EYvD5KisJCPt1kXaLid0rL00uM~p1AX8Gs-LIMyc6D3BHZbdJ7m7GKUPBwrIZiJM5zR4xsUCw3IdLutgprErlD-Y4onylA8BmS8qGETguk9ti-g8KU1Fm12yqnF3oScr1ssDoRNx5zMR175g__",
    title: "Кисло-сладкий цыпленок",
    types: [1],
    sizes: [26, 30, 40],
    price: 275,
    category: 2,
    rating: 2,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/bcbd/4371/fe81d3a3ec638fb078b2122eed2d7420?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wg4yzTpBcSZHf3rwdGzxOOMkpMRXuhmGBZSbz3Kun60Qci8ipjrER61TYSjT65U-ZOvA9oR7UDO84jfBW8MdgQtHJShO4BfNk9oNMkUFx8hKNIWx19TGepfuiSFOcLpvoj8osFA-Q3Ay7kbTuEVzBhEq3FRmKthCDGuX~-xXGXaxzFXrdV4t7bezeHPseThQEDN7g161axTsSAdHbfVzuEkkjaTNcNY1lZrG-ekBS~nL8KRLa-FjgEFsRG3Q5ciixdR~JbmWDdij8J75v1SVQkB2U9eHp0~mieU8q4Sg3zBJAjHs3LjdnJ6N6IVuAl-TSV0s-1jK69wWFfMcBwVfKg__",
    title: "Чизбургер-пицца",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 415,
    category: 3,
    rating: 8,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/2997/9ae7/4b2dd8c255833c6c0db221da6a5b3fae?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CludioUlzY8k0Vi~YQg0Y6LNRAG-Ae4aBcaWISw889bR~W4xARPykAmH9Hj8QlwkhGmnOd5Ow6VPTr3HYW9pRtyTuKVAMvcv-7kKiMRhNBBXm~C0CBNzXHyWWMBQd7PMF8uOiiYWXCv1DkeKpUxU19K4dT2gS45xj6juqE6UQx76HK-5afkFjrcZAwDTFQ-tk46VYzyBhXjFVpw~zl0bC~pPDqmalO~ebLzTKqdAtOnBNIFWpnC7WYqO-6oibLA6SNwFj-M7-ehgNppqb7GxUVsD9bhzKPobTQmb6irN92obJIa6hRTYtH7qJoXDsLyokam~yJrd2DaK-cUw95Qf9g__",
    title: "Крэйзи пепперони",
    types: [0],
    sizes: [30, 40],
    price: 580,
    category: 2,
    rating: 2,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/94bc/0f13/3837f2e7162797b5233b5520d2f5ea7c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VuzxztMSv4UJ1HPhMiepxCtUhXQf0Og~Rdx014jH2thKmE8w0Awf9rL52QFJlr2NSF5R-u83~X6seYZJHn91CwNA7K4eO5DTV5F-26ShJBbnIAUbbl~QBnkOY1vEfwsrR~EHcC3GUOfdwPKpemJ31vQ3F3FIiUZpvy37SqMZief9MR~aM6IOaIl46zePmV9WTY5UZ8cNbnbLQ0N3GP-ZvNm6HocnLVLpBT6O5~~c~mROsa0TeOYvXFrbIAKQ05S8gaYT7b95yd0-butDn0MzZB2~ro0CDVr9ougazHi7vnvj~F~SBuI5k0CiVY34IUFckdVLvUHK5grZ5L0StziAcw__",
    title: "Пепперони",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 675,
    category: 1,
    rating: 9,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/ca9b/e23e/3d44180b3596e4c86e6b3c3bf2fdc984?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k7JuKdR7ASmmQM-S4FU6yuybgxBkx6hZNA7f81IM47x-trqjL69aJkAjYKMnxzgGmPoH9tX79ZilfVOvIFcb3kxyxeazr97z4JEI9fKN-I0CydMXo30zBNsexx6IF~Dm8RXNPKJadeeuFHZak7hLzdMywebjLlCzULRYg9ajnb8RfqadTlJ-OtNvRFVbbBFeFZpjP6EYvD5KisJCPt1kXaLid0rL00uM~p1AX8Gs-LIMyc6D3BHZbdJ7m7GKUPBwrIZiJM5zR4xsUCw3IdLutgprErlD-Y4onylA8BmS8qGETguk9ti-g8KU1Fm12yqnF3oScr1ssDoRNx5zMR175g__",
    title: "Маргарита",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 450,
    category: 4,
    rating: 10,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/bcbd/4371/fe81d3a3ec638fb078b2122eed2d7420?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Wg4yzTpBcSZHf3rwdGzxOOMkpMRXuhmGBZSbz3Kun60Qci8ipjrER61TYSjT65U-ZOvA9oR7UDO84jfBW8MdgQtHJShO4BfNk9oNMkUFx8hKNIWx19TGepfuiSFOcLpvoj8osFA-Q3Ay7kbTuEVzBhEq3FRmKthCDGuX~-xXGXaxzFXrdV4t7bezeHPseThQEDN7g161axTsSAdHbfVzuEkkjaTNcNY1lZrG-ekBS~nL8KRLa-FjgEFsRG3Q5ciixdR~JbmWDdij8J75v1SVQkB2U9eHp0~mieU8q4Sg3zBJAjHs3LjdnJ6N6IVuAl-TSV0s-1jK69wWFfMcBwVfKg__",
    title: "Четыре сезона",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 395,
    category: 5,
    rating: 10,
  },
  {
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/2997/9ae7/4b2dd8c255833c6c0db221da6a5b3fae?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CludioUlzY8k0Vi~YQg0Y6LNRAG-Ae4aBcaWISw889bR~W4xARPykAmH9Hj8QlwkhGmnOd5Ow6VPTr3HYW9pRtyTuKVAMvcv-7kKiMRhNBBXm~C0CBNzXHyWWMBQd7PMF8uOiiYWXCv1DkeKpUxU19K4dT2gS45xj6juqE6UQx76HK-5afkFjrcZAwDTFQ-tk46VYzyBhXjFVpw~zl0bC~pPDqmalO~ebLzTKqdAtOnBNIFWpnC7WYqO-6oibLA6SNwFj-M7-ehgNppqb7GxUVsD9bhzKPobTQmb6irN92obJIa6hRTYtH7qJoXDsLyokam~yJrd2DaK-cUw95Qf9g__",
    title: "Овощи и грибы",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 285,
    category: 5,
    rating: 7,
  },
];

export const users = [
  { email: "user1@example.com", password: bcrypt.hashSync("password1", 10) },
  { email: "user2@example.com", password: bcrypt.hashSync("password2", 10) },
  { email: "user3@example.com", password: bcrypt.hashSync("password3", 10) },
  { email: "user4@example.com", password: bcrypt.hashSync("password4", 10) },
  { email: "user5@example.com", password: bcrypt.hashSync("password5", 10) },
  { email: "user6@example.com", password: bcrypt.hashSync("password6", 10) },
  { email: "user7@example.com", password: bcrypt.hashSync("password7", 10) },
  { email: "user8@example.com", password: bcrypt.hashSync("password8", 10) },
  { email: "user9@example.com", password: bcrypt.hashSync("password9", 10) },
  { email: "user10@example.com", password: bcrypt.hashSync("password10", 10) },
];
