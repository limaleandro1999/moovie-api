export const environment = {
    server: {port: process.env.PORT || 3000},
    security:{salt_rounds: process.env.SALT_ROUNDS || 10},
    db: {url: process.env.DB_URL || 'mongodb://localhost/moovie'}
}