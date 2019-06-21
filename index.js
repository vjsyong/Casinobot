const Discord = require('discord.js');
const Account = require('./account.js');
const { decks } = require('cards');

const bot = new Discord.Client();
const token = 'NTkxNDYzNzQ0MzE2NjM3MTkx.XQxJ2Q._8eBMIn4sXjCufWWvGu_Oc80pTg';

const PREFIX = '.';

var accounts = [];
//Hardcoded for debugging
accounts.push(new Account("BiggestShaq", 1000));

const deck = new decks.StandardDeck();
deck.shuffleAll();
var playerHand = [];
var dealerHand = [];

var gamestarted = false

bot.login(token);

bot.on('ready', () => { console.log('Casino Bot is now online'); });

bot.on('message', message=>{
    //Ignore all bots
    if(message.author.bot) 
        return;

    let args = message.content.substring(PREFIX.length).split(" ");

    var a_index = existsAccount(message.author.username.toString());
    console.log(a_index);
    //Commands
    switch(args[0]){
        case 'open':
            if(a_index < 0){
                var newAccount = new Account(message.author.username.toString(), 1000);
                accounts.push(newAccount);
                console.log(accounts[0].getBearer());
                message.channel.send("Very well good sir. I have created for you an account with " + newAccount.getCredit() + " credits.");
            }
            else{
                message.channel.send("You already have an account with us. Please enjoy your time here.");
            }
            
        break;
        
        case 'balance':
            /*let i = 0;
            for(; i < accounts.length; i++)
                if(accounts[i].getBearer() === message.author.username.toString())
                    break;*/
            if(a_index >= 0){
                message.channel.send("You have " + accounts[a_index].getCredit() + " credits remaining.");
            }else{
                message.channel.send("I'm afraid you do not have account with us.");
            }
        break;

        case 'set':
            if(a_index >= 0){
                message.channel.send("I have set your account to " + accounts[a_index].setCredit(2000) + " credits.");
            }else{
                message.channel.send("I'm afraid you do not have account with us.");
            }
        break;

        case 'bj':        
            if(args.length != 2){
                message.channel.send("To play blackjack use .bj [amount]");
                break;
            }
            
            if(a_index >= 0)
            {
                if(accounts[a_index].getCredit() < args[1]){
                    message.channel.send("I believe you have insufficient credits to play this amount");
                    gamestarted = true;
                }else{
                //Placeholder
                    if(gamestarted == false){
                        playerHand = deck.draw(2);
                        dealerHand = deck.draw(2);
                    }
                    let embed = new Discord.RichEmbed()
                        .setTitle("Blackjack Session Information")
                        .setAuthor(message.author.username.toString(), (message.author.avatarURL == null)?message.author.defaultAvatarURL:message.author.avatarURL)
                        .setColor(0x00AE86)
                        //.setThumbnail("https://cdn.discordapp.com/avatars/" + bot.user.id + "/" + bot.user.avatarURL + ".png")
                        .setThumbnail(bot.user.avatarURL)
                        .addField("Your hand:", playerHand[0].rank.shortName + " of " + playerHand[0].suit.name + ", and " + playerHand[1].rank.shortName + " of " + playerHand[1].suit.name)
                        .addField("Dealer's Hand:" , "[Face Down Card] and " + dealerHand[1].rank.shortName + " of " + dealerHand[1].suit.name); 

                    console.log(message.author.avatarURL);
                    console.log(bot.user.avatarURL);
                    message.channel.send({embed});
                
                    console.log("Dealer hand: " + dealerHand[0].rank.shortName + " of " + dealerHand[0].suit.name + ", and " + dealerHand[1].rank.shortName + " of " + dealerHand[1].suit.name)
                    //message.channel.send("I'm sorry, but you have lost " + args[1] + " credits");
                    //accounts[a_index].deductCredits(parseInt(args[1], 10));
                }
            }else{
                message.channel.send("I'm afraid you do not have account with us.");
            }

        break;

    }
});

function existsAccount(user){
    if(accounts.length === 0)
        return -1;

    let i = 0;
    for(; i <= accounts.length; i++)
        if(accounts[i].getBearer() === user)
            break;
    return (i < accounts.length)? i: -1;
}
