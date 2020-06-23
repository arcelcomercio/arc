export const opta = `
opta_data{
    items{
        opid
        contestant_home{
            id
            name
            image
        }
        contestant_away{
            id
            name
            image
        }
        scores_total_home
        scores_total_away
        tournamentcalendar{
            season_opta_widget
        }
        competition{
            opid
        }
        goals{
            contestant{
                id
            }
            time_min_sec
            type
            home_score
            away_score
            scorer_name
        }
        match_time
        period_id
        matchstatus
    }
}
`

export const optaCommentaries = `
opta_commentaries{
    items{
        commentary_id
        comment
        lastModified
        time
        commentary_type{
            name
        }
    }
}
`
