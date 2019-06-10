export const tournamentData = [
  {
    insertOne: {
      document: {
        id: 1,
        name: "MYTTC Tournament",
        startDate: "06/01/2019",
        endDate: "06/02/2019",
        location: {
          insertOne: {
            document: {
              address: "2436 Haines Rd",
              city: "Mississauga",
              postalCode: "L4Y1Y6",
              province: "Ontario",
              country: "Canada"
            }
          }
        },
        events: ["U1800", "U2400", "Open"]
      }
    }
  },
  {
    insertOne: {
      document: {
        id: 2,
        name: "CCTTA Tournament",
        startDate: "06/29/2019",
        endDate: "06/30/2019",
        location: {
          insertOne: {
            document: {
              address: "1181 Denison St",
              city: " Markham",
              postalCode: "L3R4B2",
              province: "Ontario",
              country: "Canada"
            }
          }
        },
        events: ["U1800", "U2400", "Open"]
      }
    }
  },
  {
    insertOne: {
      document: {
        id: 3,
        name: "Canadian National Championships",
        startDate: "07/01/2019",
        endDate: "07/05/2019",
        location: {
          insertOne: {
            document: {
              address: "16 Main St",
              city: "Unionville",
              postalCode: "L3R2E4",
              province: "Ontario",
              country: "Canada"
            }
          }
        },
        events: ["U15", "U18", "U21", "Men's", "Women's"]
      }
    }
  }
];
