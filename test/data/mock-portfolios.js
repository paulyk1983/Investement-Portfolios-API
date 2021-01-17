const mockPortfolios = [
    {
        "name": "test portfolio 1",
	    "description": "test my portfolio 1 description",
        "owner": {
            "name": "Paulyk"
        },
        "holdings": [
            {
                "ticker": "AXS",
                "quantity": 12,
                "stopLossType": "trailing",
                "stopLossPercent": 25,
                "notes": "testing123",
                "buyPrice": 160.53,
                "settlementDate": "2020-01-01",
                "stopLossStartDate": "2020-04-01"
            }
        ]
    },
    {
        "name": "test portfolio 1",
	    "description": "test my portfolio 2 description",
        "owner": {
            "name": "Paulyk"
        }
    },
    {
        "name": "test portfolio 1",
	    "description": "test my portfolio 2 description",
        "owner": {
            "name": "Paulyk"
        }
    }
]

module.exports = { mockPortfolios }