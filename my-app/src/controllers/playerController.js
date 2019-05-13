import $ from "jquery";

const basePath = "https://3cbea487.ngrok.io";

const getPlayers = () => {
  $.ajax({
    url: basePath + "/players",
    success: function(result) {
      if (result.isOK === false) alert(result.message);
    },
    async: false
  }).done(function(data) {
    return JSON.parse(data).players;
  });
};

export default getPlayers;
