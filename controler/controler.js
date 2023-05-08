const conectionDB = require("../DB/conectionDB");

const controler = {
  sumulation: async (req, res) => {
    try {
      //Obtenemos el ID del vuelo por parametro
      let { flightId } = req.params.id;

      //Obtenemos toda la informacion de vuelo a traves de la consulta a la Base de datos y lo asignamos al array "dataFlight"
      const [dataFlight] = await conectionDB.query(
        `SELECT * from flight WHERE id=? `,
        flightId
      );

      // en caso de que esa data no exista retornamos code:404 y data vacia.
      if (!dataFlight) {
        return res.json({ code: 404, data: {} });
      }

      // declaramos las constantes que nos serviran para armar la estructura de la respuesta exitosa.

      const takeoffDateTime = dataFlight.takeoff_date_time;
      const landingDateTime = dataFlight.landing_date_time;

      // Obtenemos la infromacion precisa de los pasajeros mediante el query, la cual almacenamos en el array "passengerData",  el cual servira para armar la estructura de la respuesta exitosa.
      const [passengerData] = await conectionDB.query(
        "SELECT p.id as passenger_id, p.dni, p.name, p.age, p.country, b.id as boarding_pass_id, b.purchase_id, b.seat_type_id, b.seat_id FROM passengers p INNER JOIN boarding_passes b ON p.id = b.passenger_id INNER JOIN purchases pr ON pr.id = b.purchase_id WHERE pr.flight_id = ?",
        flightId
      );


      // Estructura Respuesta exitosa
      const response = {
        code: 200,
        data: {
          flightId: parseInt(flightId),
          takeoffDateTime: takeoffDateTime,
          takeoffAirport: dataFlight.takeoff_airport,
          landingDateTime: landingDateTime,
          landingAirport: dataFlight.landing_airport,
          airplaneId: dataFlight.airplane_id,
          passengers: passengerData,
        },
      };

      // Respuesta exitosa
      res.json(response);
      // desconexxion de la Base de datos
      conectionDB.end(console.log("Connection to the DB finished"));
    } catch (error) {
      // en caso de error de conexion a la Base de datos retornamos  code 400.
      console.error(error);
      res.status(400).json({ code: 400, errors: "could not connect to db" });
    }
  },
};

module.exports = controler;
