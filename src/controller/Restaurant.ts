import dotenv from "dotenv";
import { Request, Response } from "express";
import restaurantSchema from "../schema/restaurantSchema";

class Restaurant {
  constructor() {
    dotenv.config();
  }

  public async restaurant0(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.findOne({ borough: "x" });
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 1. Write a MongoDB query to display all the documents in the collection restaurants.
  public async restaurant1(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find();
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
  public async restaurant2(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {},
        { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
      );
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 4. Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
  public async restaurant3(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {},
        {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          "address.zipcode": 1,
          _id: 0,
        }
      );
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 5. Write a MongoDB query to display all the restaurant which is in the borough Bronx.
  public async restaurant4(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({ borough: "Bronx" }).count();
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 6. Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
  public async restaurant5(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({ borough: "Bronx" }).limit(5);
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 7.Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
  public async restaurant6(req: Request, res: Response) {
    try {
      const data = await restaurantSchema
        .find({ borough: "Bronx" })
        .skip(5)
        .limit(5);
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
  public async restaurant7(req: Request, res: Response) {
    try {
      const data = await restaurantSchema
        .find({
          grades: { $elemMatch: { score: { $gt: 90 } } },
        })
        .count();
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
  public async restaurant8(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } },
      });
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
  public async restaurant9(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        "address.coord": { $lt: -95.754168 },
      });
      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of
  // 'American' and their grade score more than 70 and latitude less than -65.754168.
  public async restaurant10(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { cuisine: { $ne: "American" } },
          { grades: { $elemMatch: { score: { $gt: 70 } } } },
          { coord: { $lt: -65.754168 } },
        ],
      });

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 12. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American'
  //  and achieved a score more than 70 and located in the longitude less than -65.754168.
  // Note : Do this query without using $and operator.
  public async restaurant11(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        cuisine: { $ne: "American " },
        "grades.score": { $gt: 70 },
        coord: { $lt: -65.754168 },
      });

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 13. Write a MongoDB query to find the restaurants which do not prepare
  //  any cuisine of 'American' and achieved
  //  a grade point 'A' not belongs to the borough Brooklyn.
  // The document must be displayed according to the cuisine in descending order.
  public async restaurant12(req: Request, res: Response) {
    try {
      const data = await restaurantSchema
        .find({
          cuisine: { $ne: "American " },

          // "grades.grade": {$eq: "A" },this is same as below
          "grades.grade": "A",
          borough: { $ne: "Brooklyn" },
        })
        .sort({ cuisine: -1 });

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }

  // 14. Write a MongoDB query to find the restaurant
  //  Id, name, borough and cuisine for those
  //  restaurants which contain 'Wil' as first three letters for its name.
  public async restaurant13(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { name: { $regex: /^Wil/ } },
        { restaurant_id: 1, name: 1, cuisine: 1 }
      );

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 15. Write a MongoDB query to find the restaurant Id,
  //name, borough and cuisine for those restaurants which contain 'ces'
  // as last three letters for its name
  public async restaurant14(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { name: { $regex: /ces$/ } },
        { restaurant_id: 1, name: 1, cuisine: 1, borough: 1 }
      );

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
  // for those restaurants which contain 'Reg' as three letters somewhere in its name.
  public async restaurant15(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { name: { $regex: /.*Reg*./ } },
        { restaurant_id: 1, name: 1, cuisine: 1, borough: 1 }
      );

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 17. Write a MongoDB query to find the restaurants which belong to the
  // borough Bronx and prepared either American or Chinese dish.
  public async restaurant16(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        borough: "Bronx",
        $or: [{ cuisine: "American " }, { cuisine: "Chinese" }],
      });

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 18. Write a MongoDB query to find the restaurant Id, name, borough and cuisine
  // for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.
  public async restaurant17(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } },
        {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        }
      );

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those
  // restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
  public async restaurant18(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } },
        {
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        }
      );

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
  // 20. Write a MongoDB query to find the restaurant Id, name, borough
  // and cuisine for those restaurants which achieved a score which is not more than 10.
  public async restaurant(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find();

      console.log(data, "data");
      res.status(200).json({
        message: "fetched",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
  }
}

export default new Restaurant();
