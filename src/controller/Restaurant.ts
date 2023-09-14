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
  // 2. Write a MongoDB query to display the fields restaurant_id, name,
  // borough and cuisine for all the documents in the collection restaurant.
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
  // 4. Write a MongoDB query to display the fields restaurant_id,
  //name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
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
  // 20. Write a MongoDB query to find the restaurant Id, name, borough and
  // cuisine for those restaurants which achieved a score which is not more than 10.
  public async restaurant19(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { "grades.score": { $lte: 10 } },
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
  // 21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those
  // restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
  public async restaurant20(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          $or: [
            {
              $and: [
                { cuisine: { $ne: "American " } },
                { cuisine: { $ne: "Chinese" } },
              ],
            },
            { name: /^Wil/ },
          ],
        },
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
  // 22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade
  // of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..
  public async restaurant21(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          "grades.grade": "A",
          "grades.score": 11,
          "grades.date": { $date: "2014-08-11T00:00:00Z" },
        },
        { restaurant_id: 1, name: 1, grades: 1 }
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
  // 23. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants
  //  where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
  public async restaurant22(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          "grades.1.grade": "A",
          "grades.1.score": 9,
          "grades.1.date": { $date: "2014-08-11T00:00:00Z" },
        },
        { restaurant_id: 1, name: 1, grades: 1 }
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
  // 24. Write a MongoDB query to find the restaurant Id, name, address and geographical location
  // for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..
  public async restaurant23(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { "address.coord.1": { $gt: 42, $lte: 52 } },
        { restaurant_id: 1, name: 1, grades: 1 }
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
  // 25. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
  public async restaurant24(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find().sort({ name: -1 });

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
  // 26. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
  public async restaurant25(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find().sort({ name: 1 });

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
  // 27. Write a MongoDB query to arranged the
  // name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
  public async restaurant26(req: Request, res: Response) {
    try {
      const data = await restaurantSchema
        .find()
        .sort({ cuisine: -1, borough: 1 });

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
  // 28. Write a MongoDB query to know whether all the addresses contains the street or not.
  public async restaurant27(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        "address.street": { $exists: true },
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
  // 29. Write a MongoDB query which will select all
  //  documents in the restaurants collection where the coord field value is Double.
  public async restaurant28(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        coord: { $type: "double" },
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
  // 30. Write a MongoDB query which will select the restaurant Id, name and grades for
  // those restaurants which returns 0 as a remainder after dividing the score by 7.
  public async restaurant29(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          "grades.score": { $mod: [7, 0] },
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 31. Write a MongoDB query to find the restaurant name,
  //  borough, longitude and attitude and cuisine for those restaurants
  //  which contains 'mon' as three letters somewhere in its name.
  public async restaurant30(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          name: { $regex: /.*mon*./i },
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 32. Write a MongoDB query to find the restaurant name, borough, longitude and latitude
  // and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
  public async restaurant31(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          name: { $regex: /^Mad/ },
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 33. Write a MongoDB query to find the restaurants that have
  // at least one grade with a score of less than 5.
  public async restaurant32(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          "grades.score": { $lt: 5 },
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  //34. Write a MongoDB query to find the restaurants that have at least
  //  one grade with a score of less than 5 and that are located in the
  //  borough of Manhattan.
  public async restaurant33(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          "grades.score": { $lt: 5 },
          borough: "Manhattan",
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 35. Write a MongoDB query to find the restaurants that have at least one grade
  // with a score of less than 5 and that are located in the
  // borough of Manhattan or Brooklyn.
  public async restaurant34(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          $and: [
            { "grades.score": { $lt: 5 } },
            { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
          ],
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 36. Write a MongoDB query to find the restaurants that have at
  // least one grade with a score of less than 5 and that are located
  //  in the borough of Manhattan or Brooklyn, and their cuisine is not American.
  public async restaurant35(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          $and: [
            { "grades.score": { $lt: 5 } },
            { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
            { cuisine: { $ne: "American " } },
          ],
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 37. Write a MongoDB query to find the restaurants that have at least one
  //  grade with a score of less than 5 and that are located in the borough of
  //  Manhattan or Brooklyn, and their cuisine is not American or Chinese
  public async restaurant36(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        {
          $and: [
            { "grades.score": { $lt: 5 } },
            { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
            { $nor: [{ cuisine: "American " }, { cuisine: "Chinese" }] },
          ],
        },
        { restaurant_id: 1, name: 1, "grades.grade": 1 }
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
  // 38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
  public async restaurant37(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [{ "grades.score": 2 }, { "grades.score": 6 }],
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
  // 39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score
  //  of 6 and are located in the borough of Manhattan.
  public async restaurant38(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { "grades.score": 2 },
          { "grades.score": 6 },
          { borough: "Manhattan" },
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
  // 40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6
  // and are located in the borough of Manhattan or Brooklyn.
  public async restaurant39(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { "grades.score": 2 },
          { "grades.score": 6 },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
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
  // 41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and
  //  a grade with a score of 6 and are
  //  located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
  public async restaurant40(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { "grades.score": 2 },
          { "grades.score": 6 },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
          { cuisine: { $ne: "American " } },
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
  // 42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located
  // in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
  public async restaurant41(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { "grades.score": 2 },
          { "grades.score": 6 },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
          { cuisine: { $nin: ["American ", "Chinese"] } },
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
  // 43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
  public async restaurant42(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $or: [{ "grades.score": 2 }, { "grades.score": 6 }],
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
  // 44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or
  //  a grade with a score of 6 and are located in the borough of Manhattan.
  public async restaurant43(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { borough: "Manhattan" },
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
  // 45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a
  // grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
  public async restaurant44(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
        ],
      });
      const data1 = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
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
  // 46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade
  //  with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
  public async restaurant45(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
          { cuisine: { $ne: "American " } },
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
  // 47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score
  // of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
  public async restaurant46(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { borough: { $in: ["Manhattan", "Brooklyn"] } },
          { cuisine: { $nin: ["American ", "Chinese"] } },
        ],
      });
      const data1 = await restaurantSchema.find({
        $and: [
          { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
          { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
          { $nor: [{ cuisine: "American " }, { borough: "Chinese" }] },
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
  // 48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
  public async restaurant47(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find(
        { "grades.score": { $gt: 5 } },
        { name: 1 }
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
  // 49. Write a MongoDB query to find the restaurants that
  //  have all grades with a score greater than 5 and are located in the borough of Manhattan.
  public async restaurant48(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [{ "grades.score": { $gt: 5 } }, { borough: "Manhattan" }],
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
  // 50. Write a MongoDB query to find the restaurants that have all grades with a score greater than
  // 5 and are located in the borough of Manhattan or Brooklyn.
  public async restaurant49(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.find({
        $and: [
          { "grades.score": { $gt: 5 } },
          {
            $borough: {
              $in: [{ borough: "Manhattan" }, { borough: "Brooklyn" }],
            },
          },
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
  // 51. Write a MongoDB query to find the average score for each restaurant.
  public async restaurant50(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.aggregate([
        { $unwind: "$grades" },
        { $group: { _id: "$name", avg: { $avg: "$grades.score" } } },
      ]);

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
  // 52. Write a MongoDB query to find the highest score for each restaurant.
  public async restaurant51(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.aggregate([
        { $unwind: "$grades" },
        { $group: { _id: "$name", maxScore: { $max: "$grades.score" } } },
      ]);
      console.log(data, "data", "         ", data.length);
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
  //53. Write a MongoDB query to find the lowest score for each restaurant.
  public async restaurant52(req: Request, res: Response) {
    try {
      const data = await restaurantSchema.aggregate([
        { $unwind: "$grades" },
        // { $match: { borough: "Bronx" } },
        {
          $group: {
            _id: "$address",
            maxScore: { $min: "$grades.score" },
          },
        },
      ]);
      console.log(data, "data", "         ", data.length);
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
  // 54. Write a MongoDB query to find the count of restaurants in each borough.
  public async restaurant53(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([{ $group: { _id: "borough", count: { $sum: 1 } } }])
        .then((data) => console.log(data, "data"));

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
  // 55. Write a MongoDB query to find the count of restaurants for each cuisine.
  public async restaurant54(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([{ $group: { _id: "cuisine", count: { $sum: 1 } } }])
        .then((data) => console.log(data, "data"));

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
  // 56. Write a MongoDB query to find the count of restaurants for each cuisine and borough.
  public async restaurant55(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $group: { _id: ["$cuisine", "$borough"], count: { $sum: 1 } },
          },
        ])
        .then((data) => console.log(data, "data"));

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
  // 57. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
  public async restaurant56(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $match: { "grades.grade": "A" },
          },
          { $group: { _id: "$cuisine", count: { $sum: 1 } } },
        ])
        .then((data) => console.log(data, "data"));

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
  // 58. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
  public async restaurant57(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          // { $unwind: "$grades" },
          { $match: { "grades.grade": "A" } },
          { $group: { _id: "$borough", count: { $sum: 1 } } },
        ])
        .then((data) => console.log(data, "data"));

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
  // 59. Write a MongoDB query to find the count of restaurants
  // that received a grade of 'A' for each cuisine and borough.
  public async restaurant58(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          // { $unwind: "$grades" },
          { $match: { "grades.grade": "A" } },
          {
            $group: {
              _id: { borough: "$borough", cuisine: "$cuisine" },
              count: { $sum: 1 },
            },
          },
        ])
        .then((data) => console.log(data, "data"));

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
  // *****60. Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.
  public async restaurant59(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $unwind: "$grades",
          },
          {
            $project: {
              month: { $month: { $toDate: "$grades.date" } },
              year: { $year: { $toDate: "$grades.date" } },
            },
          },
          {
            $group: {
              _id: { month: "$month", year: "$year" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
        ])
        .then((data) => console.log(data, "data"));

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
  // 1.Display a list stating how many tutorials are written by each user
  public async restaurant60(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $group: {
              _id: "$by_user",
              tutorial: { $push: "$title" },
              count: { $sum: 1 },
            },
          },
        ])
        .then((data) => console.log(data, "data"));

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

  // 2.Calculate and display the total likes, average likes, minimum and maximum likes
  public async restaurant61(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $group: {
              _id: "$likes",
              totalLikes: { $sum: "$likes" },
              avgLikes: { $avg: "$likes" },
              minLikes: { $min: "$likes" },
              maxLikes: { $max: "$likes" },
            },
          },
        ])
        .then((data) => console.log(data, "data"));

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
  //Retrieve the url each user as an array
  public async restaurant62(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          {
            $group: { _id: "$url", urlList: { $push: "$url" } },
          },
        ])
        .then((data) => console.log(data, "data"));

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
  //Display the total number of documents in each hosting
  public async restaurant63(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([{ $group: { _id: "$hosting", count: { $sum: 1 } } }])
        .then((data) => console.log(data, "data"));

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
  //Display the total number of documents for each hosting in
  //decending order of the total numbers
  public async restaurant64(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $group: { _id: "$hosting", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .then((data) => console.log(data, "data"));

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
  //Display the tipo five hosting by the total number of the documents
  public async restaurant65(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $group: { _id: "$hosting", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ])
        .then((data) => console.log(data, "data"));

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
  //calculate the number of hosting done by the Aws.amazon.com only
  public async restaurant66(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $match: { hosting: "aws.amazon.com" } },
          { $group: { _id: "$hosting", count: { $sum: 1 } } },
        ])
        .then((data) => console.log(data, "data"));

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
  //Find all the users that live in the area with 90210 area code
  public async restaurant67(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $match: { $zip: 90210 } },
          { $project: { firstname: 1, zip: 1 } },
        ])
        .then((data) => console.log(data, "data"));

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
  //Find number  of the users that live in the area with 90210 area code
  public async restaurant68(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $match: { $zip: 90210 } },
          { $group: { _id: "$zip", count: { $sum: 1 } } },
        ])
        .then((data) => console.log(data, "data"));

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
  //Find the total no of users
  public async restaurant69(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([{ $group: { _id: "$firstName", count: { $sum: 1 } } }])
        .then((data) => console.log(data, "data"));

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
  //retrive the document whose document is
  public async restaurant70(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([{ $match: { $zip: 90210 } }])
        .then((data) => console.log(data, "data"));

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
  //retrive the document whose document is
  public async restaurant71(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $match: { $state: "CA" } },
          { $project: { $city: 1, $zip: 1, $email: 1 } },
        ])
        .then((data) => console.log(data, "data"));

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
  //find the noof documents whose zip code is 90210
  public async restaurant(req: Request, res: Response) {
    try {
      await restaurantSchema
        .aggregate([
          { $match: { $zip: 90210 } },
          { $group: { _id: "$zip", count: { $sum: 1 } } },
        ])
        .then((data) => console.log(data, "data"));

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
