from django.test import TestCase
from .models import Article, Newspaper, Category
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework import status
from django.urls import reverse


# model Newspaper Test


class NewspaperModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.newspaper = Newspaper.objects.create(
            name="Test Newspaper", avatar_url="http://test.com"
        ).newspaper_id

    def test_name_content(self):
        newspaper = Newspaper.objects.get(newspaper_id=self.newspaper)
        expected_object_name = f"{newspaper.name}"
        self.assertEqual(expected_object_name, "Test Newspaper")

    def test_url_content(self):
        newspaper = Newspaper.objects.get(newspaper_id=self.newspaper)
        expected_object_name = f"{newspaper.avatar_url}"
        self.assertEqual(expected_object_name, "http://test.com")


# model Category Test
class CategoryModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        cls.category = Category.objects.create(name="Test Category").pk

    def test_name_content(self):
        category = Category.objects.get(id=self.category)
        expected_object_name = f"{category.name}"
        self.assertEqual(expected_object_name, "Test Category")


# model Article Test
class ArticleModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Newspaper.objects.create(name="Test Newspaper", avatar_url="http://test.com")
        Category.objects.create(name="Test Category")
        cls.article = Article.objects.create(
            title="Test Article",
            descritpion="Test Description",
            publication_date="2022-01-01T00:00:00Z",
            image_url="http://test.com/image.jpg",
            author="Test Author",
            content="Test Content",
            newspaper=Newspaper.objects.get(name="Test Newspaper"),
        ).article_id
        Article.objects.get(title="Test Article").categories.add(
            Category.objects.get(name="Test Category")
        )
        
    def test_title_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.title}"
        self.assertEqual(expected_object_name, "Test Article")

    def test_description_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.descritpion}"
        self.assertEqual(expected_object_name, "Test Description")

    def test_publication_date_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.publication_date}"
        self.assertEqual(expected_object_name, "2022-01-01 00:00:00+00:00")

    def test_image_url_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.image_url}"
        self.assertEqual(expected_object_name, "http://test.com/image.jpg")

    def test_author_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.author}"
        self.assertEqual(expected_object_name, "Test Author")

    def test_content_content(self):
        article = Article.objects.get(pk=self.article)
        expected_object_name = f"{article.content}"
        self.assertEqual(expected_object_name, "Test Content")


class CategoryViewsetTestCase(TestCase):

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.category = Category.objects.create(name='Test Category')
        self.client.force_authenticate(user=get_user_model().objects.get_or_create(user_name = "test" , email = "test@test.test", phone_number = "0776555555" , first_name = "test", last_name = "test" , adress = "test adress" )[0])  # assuming you have a User model

    def test_api_can_get_category_list(self):
        """Test the api can get a list of categories."""
        response = self.client.get(reverse('category-list'), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Test Category')

class NewspaperViewsetTestCase(TestCase):

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.newspaper = Newspaper.objects.create(name='Test Newspaper', avatar_url='http://test.com')
        self.client.force_authenticate(user=get_user_model().objects.get_or_create(user_name = "test" , email = "test@test.com", phone_number = "0776555555" , first_name = "test", last_name = "test" , adress = "test adress", is_active = True )[0])
        self.admin = get_user_model().objects.get_or_create(user_name = "admin" , email = "admin@test.com", phone_number = "0786555555" , first_name = "admin", last_name = "admin" , adress = "test adress", is_active = True, is_staff = True)[0]

    def test_api_can_get_newspaper_list(self):
        """Test the api can get a list of newspapers."""
        response = self.client.get(reverse('newspaper-list'), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Test Newspaper')

    def test_api_can_create_newspaper(self):
        """Test the api can create a newspaper."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.post(reverse('newspaper-list'), {'name': 'Test Newspaper', 'avatar_url': 'http://test.com'}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Newspaper')

    def test_api_can_update_newspaper(self):
        """Test the api can update a newspaper."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(reverse('newspaper-detail', kwargs={'pk': self.newspaper.pk}), {'name': 'Test Newspaper Updated', 'avatar_url': 'http://test.com'}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Newspaper Updated')

    def test_api_can_delete_newspaper(self):
        """Test the api can delete a newspaper."""
        self.client.force_authenticate(user=self.admin)
        response = self.client.delete(reverse('newspaper-detail', kwargs={'pk': self.newspaper.pk}), format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_api_cannot_create_newspaper(self):
        """Test the api cannot create a newspaper."""
        response = self.client.post(reverse('newspaper-list'), {'name': 'Test Newspaper', 'avatar_url': 'http://test.com'}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_cannot_update_newspaper(self):
        """Test the api cannot update a newspaper."""
        response = self.client.put(reverse('newspaper-detail', kwargs={'pk': self.newspaper.pk}), {'name': 'Test Newspaper Updated', 'avatar_url': 'http://test.com'}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_cannot_delete_newspaper(self):
        """Test the api cannot delete a newspaper."""
        response = self.client.delete(reverse('newspaper-detail', kwargs={'pk': self.newspaper.pk}), format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    



class ArticleViewsetTestCase(TestCase):
    
        def setUp(self):
            """Define the test client and other test variables."""
            self.client = APIClient()
            self.newspaper = Newspaper.objects.create(name='Test Newspaper', avatar_url='http://test.com')
            self.category = Category.objects.create(name='Test Category')
            self.article = Article.objects.create(
                title='Test Article',
                descritpion='Test Description',
                publication_date='2022-01-01T00:00:00Z',
                image_url='http://test.com/image.jpg',
                author='Test Author',
                content='Test Content',
                newspaper=self.newspaper
            )
            self.article.categories.add(self.category)
            self.client.force_authenticate(user=get_user_model().objects.get_or_create(user_name = "test" , email = "test@test.com", phone_number = "0776555555" , first_name = "test", last_name = "test" , adress = "test adress", is_active = True )[0])
            self.admin = get_user_model().objects.get_or_create(user_name = "admin" , email = "admin@test.com", phone_number = "0786555555" , first_name = "admin", last_name = "admin" , adress = "test adress", is_active = True, is_staff = True)[0]

        def test_api_can_get_article_list(self):

    
