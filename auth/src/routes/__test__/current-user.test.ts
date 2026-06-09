import request from "supertest";
import app from "../../app";

it("respond with details about the current user", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("respond with null if not authenticated user", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);
  expect(response.body.currentUser).toBeNull();
});
