import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUserService, UserService } from '../service/user.service';

passport.use(
    new LocalStrategy( { usernameField: 'email' },async (email:string, password:string, done:any) => {
        try {
            const userService: IUserService = new UserService();
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const isMatch = await user.comparePassword(password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport