import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: '',
    firstName: null,
    lastName: null,
    userName: null,
    isLoading: false,
    error: null,
  };

// Appel API pour récupérer le token
/* Ce code définit une action asynchrone nommée "getToken". Cette action utilise la fonction "createAsyncThunk"
pour exécuter une requête POST à l'URL 'http://localhost:3001/api/v1/user/login' avec les données 'credential'. 
Une fois la réponse reçue, la fonction extrait le token de la propriété 'body' de la réponse et le retourne. */
export const getToken=createAsyncThunk('user/getToken', async (credential) => {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credential);
    const token = await response.data.body.token;
    return token;
})

// Appel API pour récupérer le user data
export const getUserData=createAsyncThunk('user/getUserData', async (token) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'accept': 'application/json',
            'Authorization': "Bearer " + token
        }
    }
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);
    const data = await response.data.body
    return data;
})

// Appel API pour modifier le user name
export const updateUserName=createAsyncThunk('user/updateUserName', async ({token, newUserName}) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile',
    {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({userName: newUserName})
    })
    const data = await response.json()
    return data
})
// Avec createSlice, plus besoin d'utiliser createAction  et associer nos actions à notre reducer.
// createSlice  est une fonction de Redux Toolkit qui génère automatiquement des reducers, 
// des actions et des action creators en se basant sur un objet définissant l'état initial et les fonctions réductrices.
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
            state.firstName = null
            state.lastName = null
            state.userName = null
            state.isLoading = false
            state.error = null
        }
    },

    // 3 actions générées par asyncThunk
    // extraRducers permet de définir des reducers supplémentaires en dehors du slice
    // Les extraReducers sont utilisés pour gérer les actions créées par createAsyncThunk.    
    // En fonction du statut de la promesse, nous mettrons à jour notre état.
    // Pour chaque action créée à l'aide de createAsyncThunk, il existe trois états probables
    // pour la promesse renvoyée. en attente, accompli, rejeté.
    extraReducers: (builder) => {     // "builder" est la fonction callback pour définir les reducers
        builder
        //Dans cet extrait de code, nous utilisons la fonction callback "builder" pour définir les reducers
        //pour une action appelée "getToken".

        
            /*Lorsque l'action "getToken.pending" est dispatchée, le state isLoading est défini comme true pour indiquer 
            qu'une demande de token est en cours.*/
            .addCase(getToken.pending, (state, action) => { 
                state.isLoading = true
            })
            
            /* Lorsque l'action "getToken.fulfilled" est dispatchée avec succès, le state isLoading est défini comme false,
            le token est stocké dans le state et toute erreur est effacée. */
            .addCase(getToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
                state.error = null;
            })

            /* En revanche, si l'action "getToken.rejected" est dispatchée en raison d'une erreur, le state isLoading 
            est défini comme false et en fonction du code d'erreur, un message d'erreur approprié est stocké dans le state.
            Par exemple, si le code d'erreur est "ERR_BAD_REQUEST", un message spécifique indiquant que l'email 
            et/ou le mot de passe sont incorrects est affiché. Sinon, le message d'erreur de l'action est affiché. */
            .addCase(getToken.rejected, (state, action) => {
                state.isLoading = false;
                if(action.error.code === "ERR_BAD_REQUEST") {
                    state.error = "Email and/or password incorrect";
                } else {
                    state.error = action.error.message;
                }
            })

           /*  Ce code ajoute un gestionnaire d'action à un reducer Redux. Lorsque l'action getUserData.pending est
            dispatchée, l'état du store Redux est modifié de telle sorte que isLoading devient true. 
            Cela pourrait être utilisé pour indiquer que la récupération des données de l'utilisateur est en cours. */
            .addCase(getUserData.pending, (state, action) => { 
                state.isLoading = true
            })

            /* Ce code Redux indique qu'en cas de succès de la récupération des données utilisateur (getUserData.fulfilled),
            les données reçues de l'action seront utilisées pour mettre à jour l'état de l'application. Plus précisément,
            il met à jour l'état isLoading à false, et met à jour state.firstName, state.lastName, state.userName avec
            les valeurs respectives extraites de action.payload. Enfin, il réinitialise state.error à null. */
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.userName = action.payload.userName
                state.error = null;
            })

            /* Ce code Redux signifie qu'il ajoute un nouveau "case" à reducer qui gère l'action gettUserData.rejected.
            Lorsque cette action est effectuée, il met à jour le state en modifiant la valeur de isLoading à
            false et en stockant le message d'erreur de l'action dans la propriété error du state. */
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            /* ce code gère l'état de l'application en définissant isLoading à true lorsque l'opération de mise à jour du nom 
            d'utilisateur est en cours (pendant la phase pending). Cela permet aux composants de l'application de réagir à 
            cet état, par exemple, en affichant un indicateur de chargement à l'utilisateur pendant que le nom est mis à jour. */
            .addCase(updateUserName.pending, (state, action) => {  
                state.isLoading = true
            })

            /* Ce code est utilisé pour gérer l'état lorsque l'opération de mise à jour du nom d'utilisateur a réussi.
            Il met à jour les indicateurs d'état pour refléter que le chargement est terminé, qu'il a reçu un nouveau nom 
            d'utilisateur à partir de la réponse, et qu'il n'y a pas d'erreurs à signaler. */
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userName = action.payload.body.userName;
                state.error = null;
            })

            /* ce code permet de gérer l'échec d'une opération de mise à jour du nom d'utilisateur. Lorsque la promesse 
            associée à updateUserName est rejetée (c'est-à-dire qu'une erreur se produit), il met à jour l'état pour 
            indiquer que le chargement est terminé et stocke le message d'erreur pour qu'il puisse être utilisé 
            ultérieurement, par exemple, pour afficher un message d'erreur à l'utilisateur. */
            .addCase(updateUserName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

// "userSlice.reducer" regroupe tous les reducers contenu dans userSlice 
// pour qu'ils soient utilisables dans le store
export default userSlice.reducer;

/* extrait et exporte l'action logout de la slice userSlice, permettant ainsi de l'utiliser ailleurs dans votre 
application pour gérer la déconnexion d'un utilisateur. */
export const { logout } = userSlice.actions;