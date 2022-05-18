let menu=[
    {
        title: 'Dessert',
        buttonType:"category",
        subItems: [
            {
                title: 'coco-flan',
                price: 9,
                quantity:1,
                buttonType:"menu-item",
                clicked:false,
                mods:[],
                sent:false,
                foodType: 'dessert',
                isDone:false
            },
            {
                title: 'panna-cotta',
                price: 8,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                sent:false,
                foodType: 'dessert',
                isDone:false
            },
            {
                title: 'fried ice cream',
                price: 9000,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                sent:false,
                foodType: 'dessert',
                isDone:false
            },
        ],
    },
    {
        title: 'Mains',
        buttonType:"category",
        subItems: [
            {
                title: 'steak',
                price: 35,
                quantity:1,
                buttonType:"menu-item",
                isDone:false,
                clicked:false,
                subItems:[
                    {title:"Med Rare"},
                    {title:"Med"},
                    {title:"Med well"},
                    {title:"Well Done"},
                ],
                mods:[],
                selectedOption:"",
                sent:false,
                foodType:"Main"
            },
            {
                title: 'Salmon',
                price: 32,
                quantity:1,
                buttonType:"menu-item",
                isDone:false,
                clicked:false,
                subItems:[
                    {title:"Med Rare"},
                    {title:"Med"},
                    {title:"Well Done"},
                ],
                mods:[],
                selectedOption:"",
                sent:false,
                foodType:"Main"
            },
            {
                title: 'quarter chicken',
                price: 25,
                isDone:false,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                sent:false,
                foodType:"Main"
            },
        ],
    },
    {
        title: 'Apps',
        buttonType:"category",
        subItems: [
            {
                title: 'Wings',
                price: 12,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                isDone:false,
                sent:false,
                foodType:"apps"
            },
            {
                title: 'brussel sprouts',
                price: 13,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                isDone:false,
                sent:false,
                foodType:"apps"
            },
            {
                title: 'chicken fingers',
                price: 9,
                quantity:1,
                buttonType:"menu-item",
                mods:[],
                clicked:false,
                isDone:false,
                sent:false,
                foodType:"apps"
            },
        ],
    },
    {
        title: "Wines",
        buttonType:"category",
        subItems:[
            {
                title: "red",
                buttonType:"category",
                subItems:[
                    {
                        title:"By Glass",
                        buttonType:"category",
                        subItems:[
                            {
                                title:"Montepulciano D'abruzzio",
                                price:9,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Negroamaro",
                                price:11,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Brunello",
                                price:15,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            }
                        ]
                    },
                    {
                        title:"By the Bottle",
                        buttonType:"category",
                        subItems:[
                            {
                                title:"Montepulciano D'abruzzio BTL",
                                price:45,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Negroamaro BTL",
                                price:60,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Brunello BTL",
                                price:120,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            }
                        ]
                    }
                ]
            },
            {
                title: "white",
                buttonType:"category",
                subItems:[
                    {
                        title:"By Glass",
                        buttonType:"category",
                        subItems:[
                            {
                                title:"Sauvignon Blancv",
                                price:9,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Chardonnay",
                                price:11,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"pinot grigio",
                                price:15,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            }
                        ]
                    },
                    {
                        title:"By the Bottle",
                        buttonType:"category",
                        subItems:[
                            {
                                title:"Sauvignon Blanc BTL",
                                price:25,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"Chardonnay BTL",
                                price:51,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            },
                            {
                                title:"pinot grigio BTL",
                                price:25,
                                quantity:1,
                                buttonType:"menu-item",
                                isDone:false,
                                clicked:false,
                                sent:false
                            }
                        ]
                    },
                ]
            }
        ]
    }
];

export default menu;