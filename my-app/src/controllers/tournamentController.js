import { basePath } from "./index";
import { format } from "date-fns";

export async function getTournaments() {
  return await fetch(basePath + "/tournaments").then(res =>
    res.json().then(data =>
      data.map(tournament => {
        const startDate = format(new Date(tournament.startDate), "MM/DD/YYYY");
        const endDate = format(new Date(tournament.endDate), "MM/DD/YYYY");
        return {
          ...tournament,
          startDate,
          endDate
        };
      })
    )
  );
}

export async function getCountryCode(countryName) {
  return await fetch(basePath + "/countryCode/" + countryName).then(res =>
    res.json().then(data => data)
  );
}

export async function getTournamentById(tournamentId) {
  return await fetch(basePath + "/tournament/" + tournamentId).then(res =>
    res.json().then(data => {
      const startDate = format(new Date(data.startDate), "MM/DD/YYYY");
      const endDate = format(new Date(data.endDate), "MM/DD/YYYY");
      return {
        ...data,
        startDate,
        endDate
      };
    })
  );
}
