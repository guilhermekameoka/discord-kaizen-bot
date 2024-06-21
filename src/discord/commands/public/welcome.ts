import { Command } from "@/discord/base";
import { settings } from "@/settings";
import { brBuilder, createEmbedAuthor, createRow, hexToRgb, spaceBuilder, replaceText } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, Locale} from "discord.js";
import lang from "./welcome.lang.json";

new Command({
    name: "welcome",
    dmPermission: false,
    description: "Welcome command",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const { user, locale } = interaction;

        const avaliableLocales = locale == Locale.EnglishUS || locale == Locale.PortugueseBR
        ? locale : Locale.EnglishUS;

        const githubProfileUrl = "https://github.com/guilhermekameoka";

        const embed = new EmbedBuilder({
            author: createEmbedAuthor(user),
            color: hexToRgb(settings.colors.theme.success),
            description: brBuilder(
                ...lang.description[avaliableLocales].map(
                    text => replaceText(text, { 
                        "var(user)": user,
                    })
                )
            ),
            footer: {
                text: replaceText(lang.footer[avaliableLocales], {
                    "var(github)": spaceBuilder("Guilherme Kameoka", githubProfileUrl)
                }),
                iconURL: githubProfileUrl+".png",
            }
        });

        const row = createRow(
            // Button function on src/discord/components/example.ts
            new ButtonBuilder({
                customId: "example-component-button", 
                label: "Example button", 
                style: ButtonStyle.Primary
            })
        );

        interaction.reply({ ephemeral, embeds: [embed], components: [row] });
    },
});