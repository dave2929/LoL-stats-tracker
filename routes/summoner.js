const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/:summonerName", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { summonerName } = req.params;
    const response = await fetch(
      `${process.env.Riot_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers }
    );
    // add if-else
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/spectator/:summonerId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { summonerId } = req.params;

    // console.log(summonerId);
    const response = await fetch(
      `${process.env.Riot_URL}/lol/spectator/v4/active-games/by-summoner/${summonerId}`,
      { headers }
    );
    const data = await response.json();

    // Not in game or incorrect summonerId
    if (data.status && data.status.status_code) {
      return res.json({
        error: "Data Not Found"
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/profile/:accountId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { accountId } = req.params;

    // console.log(accountId);
    const response = await fetch(
      `${process.env.Riot_URL}/lol/match/v4/matchlists/by-account/${accountId}`,
      { headers }
    );
    const data = await response.json();
    // When accountId is incorrect
    if (data.status && data.status.status_code) {
      return res.status(404).json({
        message: "Profile Not Found"
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/match/:matchId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { matchId } = req.params;
    const response = await fetch(
      `${process.env.Riot_URL}/lol/match/v4/matches/${matchId}`,
      { headers }
    );
    const data = await response.json();

    // When matchId is incorrect or match not found
    if (data.status && data.status.status_code) {
      return res.status(404).json({
        message: "Match Not Found"
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/mastery/:summonerId/:championId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { summonerId, championId } = req.params;
    const response = await fetch(
      `${process.env.Riot_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`,
      { headers }
    );
    const data = await response.json();

    // When summonerId or championId incorrect
    if (data.status && data.status.status_code) {
      return res.status(404).json({
        message: "Mastery Not Found"
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/mastery/:summonerId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { summonerId } = req.params;
    const response = await fetch(
      `${process.env.Riot_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
      { headers }
    );
    const data = await response.json();

    // When summonerId or championId incorrect
    if (data.status && data.status.status_code) {
      return res.status(404).json({
        message: "Mastery Not Found"
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/rankedStats/:summonerId", async (req, res) => {
  try {
    const headers = {
      "X-Riot-Token": process.env.Token
    };
    const { summonerId } = req.params;
    const response = await fetch(
      `${process.env.Riot_URL}/lol/league/v4/entries/by-summoner/${summonerId}`,
      { headers }
    );
    const data = await response.json();

    // When summonerId or championId incorrect
    if (data.status && data.status.status_code) {
      return res.status(404).json({
        message: "Ranked Stats Not Found"
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
