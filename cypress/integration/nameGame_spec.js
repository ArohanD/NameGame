describe('Home Page', () => {
  it('Loads Home Page', () => {
    cy.visit('http://localhost:6263')

    cy.contains('Play')
    cy.contains('Leaderboard')
  })
})

describe('Leaderboard', () => {
  it('Loads the Leaderboard', () => {
    cy.contains('Leaderboard').click()
    cy.contains('High Scores')
    cy.wait(500)
    cy.get('.cyLeaderBoard')
  })
})

describe('Navbar', () => {
  it('Should navigate to home page when burger is clicked', () => {
    cy.get('div > a > svg').click()
    cy.contains('Play')
    cy.contains('Leaderboard')
  })

  it('Should change Theme when Aa is clicked', () => {
    cy.get('.cyTheme').click()
    cy.get('#root > div').should('have.css', 'background-color', 'rgb(46, 46, 46)')
    cy.get('.cyTheme').click()
    cy.get('#root > div').should('have.css', 'background-color', 'rgb(0, 0, 0)')
    cy.get('.cyTheme').click()
  })
})

describe('Game', () => {
  it('Should load the game', () => {
    cy.contains('Play').click()
    cy.wait(500)
    cy.get('.cyProfile')
  })

  it('Should advance the game when a profile is clicked', () => {
    cy.get('.cyProfile').eq(3).click()
    cy.contains('14/15')
  })

  it('Should advance the game when a profile is not clicked', () => {
    cy.wait(15000)
    cy.contains('13/15')
  })

  it('Should highlight the selected profile with arrow keys', () => {
    cy.get('body').type('{rightarrow}')
    cy.get('.cyProfile').should('have.css', 'border', '4px solid rgb(184, 242, 214)')
  })

  it('Should advance the game when space is pressed on a highlighted profile', () => {
    cy.get('body').type(' ')
    cy.contains('12/15')
  })

  it('Should prompt players to submit scores after 15 rounds', () => {
    for(let i = 0; i <= 11; i++) cy.get('body').type(' ')
    cy.contains('Submit Score')
  })
})

// ADD KB