import { HttpClient } from '@angular/common/http'
import { AuthService } from '../services/auth/auth.service'
import { TestBed } from '@angular/core/testing'
import { IReadUser } from '../../../api/dist/users'
import { firstValueFrom, of } from 'rxjs'
import { Router } from '@angular/router'

describe('AuthService', () => {
  let service: AuthService
  let httpClientMock: jest.Mocked<HttpClient>
  let routerMock: jest.Mocked<Router>

  // mock out localStorage
  const mockGetItem = jest.fn()
  const mockSetItem = jest.fn()
  const mockRemoveItem = jest.fn()

  beforeEach(() => {
    // Reset localStorage
    jest.clearAllMocks()

    // Spy on localstorage calls
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(mockGetItem)
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
      .mockImplementation(mockSetItem)
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem')
      .mockImplementation(mockRemoveItem)

    // Mock HttpClient & router
    httpClientMock = {
      post: jest.fn(),
    } as any
    routerMock = { navigate: jest.fn() } as any

    // Set up TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Router, useValue: routerMock },
      ],
    })

    // Inject the service
    service = TestBed.inject(AuthService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const currentDate = new Date()
  const mockUser: IReadUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    active: true,
    permissions: ['read', 'write'],
    admin: false,
    locale: 'en-US',
    deletedDate: null,
    createdDate: currentDate,
    updatedDate: currentDate,
    version: 1,
  }

  // Registration test
  it('should handle user registration', async () => {
    const mockResponse = {
      success: true,
      token: 'fake-jwt-token',
      user: mockUser,
      status: 200,
      message: 'success',
    }

    httpClientMock.post.mockReturnValue(of(mockResponse))

    const response = await firstValueFrom(
      service.registerNewUser(
        'Test User',
        'test@example.com',
        'example12345!',
        'en-US',
      ),
    )

    expect(response).toEqual(mockResponse)
    expect(mockSetItem).toHaveBeenCalledWith('loginToken', 'fake-jwt-token')
    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
  })

  // Login test
  it('should perform login and store token and user on success', async () => {
    const mockResponse = {
      success: true,
      token: 'fake-jwt-token',
      user: mockUser,
      status: 200,
      message: 'Login successful',
    }

    httpClientMock.post.mockReturnValue(of(mockResponse))

    const response = await firstValueFrom(
      service.login('test@example.com', 'password'),
    )

    expect(response).toEqual(mockResponse)
    expect(mockSetItem).toHaveBeenCalledWith('loginToken', 'fake-jwt-token')
    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
  })

  // Logout test
  it('should handle logout', () => {
    service.logout()

    expect(localStorage.removeItem).toHaveBeenCalledWith('loginToken')
    expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login'])
  })

  // validate web token test
  it('should validate token', async () => {})
})
