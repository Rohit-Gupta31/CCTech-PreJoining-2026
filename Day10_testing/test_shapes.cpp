#include <gtest/gtest.h>
#include "../Day06_OOPs/Shape.h"
#include "../Day06_OOPs/Shapes.cpp"

using namespace std;

const double EPS = 0.01;

// Circle Tests

TEST(CircleTests, AreaCalculation)
{
    Circle circle(5);

    EXPECT_NEAR(circle.area(), 78.54, EPS);
}

TEST(CircleTests, PerimeterCalculation)
{
    Circle circle(5);

    EXPECT_NEAR(circle.perimeter(), 31.42, EPS);
}

// Rectangle Tests

TEST(RectangleTests, AreaCalculation)
{
    Rectangle rect(12, 10);

    EXPECT_DOUBLE_EQ(rect.area(), 120);
}

TEST(RectangleTests, PerimeterCalculation)
{
    Rectangle rect(12, 10);

    EXPECT_DOUBLE_EQ(rect.perimeter(), 44);
}

// Triangle Tests

TEST(TriangleTests, AreaCalculation)
{
    Triangle tri(10, 12, 14);

    EXPECT_NEAR(tri.area(), 58.79, EPS);
}

TEST(TriangleTests, PerimeterCalculation)
{
    Triangle tri(10, 12, 14);

    EXPECT_DOUBLE_EQ(tri.perimeter(), 36);
}

// Sorting Test

TEST(ShapeTests, SortShapesByArea)
{
    vector<unique_ptr<Shape>> shapes;

    shapes.push_back(make_unique<Rectangle>(12, 10));   // Area = 120
    shapes.push_back(make_unique<Circle>(5));           // Area ≈ 78.54
    shapes.push_back(make_unique<Triangle>(10, 12, 14)); // Area ≈ 58.79

    sort(
        shapes.begin(),
        shapes.end(),
        [](const unique_ptr<Shape>& a,
           const unique_ptr<Shape>& b)
        {
            return a->area() < b->area();
        });

    EXPECT_LT(shapes[0]->area(), shapes[1]->area());
    EXPECT_LT(shapes[1]->area(), shapes[2]->area());
}

// Edge Case

TEST(CircleTests, ZeroRadius)
{
    Circle circle(0);

    EXPECT_DOUBLE_EQ(circle.area(), 0);
    EXPECT_DOUBLE_EQ(circle.perimeter(), 0);
}

// Main Function

int main(int argc, char **argv)
{
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}