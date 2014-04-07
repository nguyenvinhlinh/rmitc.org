#!/usr/bin/env bash

links=`grep -h -o --perl-regexp 'http(s?):\/\/[^ "\(\)\<\>\]\[\`]*' \
    ../_posts/*.mkd | uniq`

number=`echo $links | wc -w`
echo "Checking $number links..."

timeout=8  # for each link, in seconds
exit_code=0

for link in $links; do
    resp_code=`curl -m $timeout -s -o /dev/null -I -w "%{http_code}" $link`

    # Scream like hell if response is not 2xx or 3xx
    if [ ${resp_code:0:1} != 2 ] && [ ${resp_code:0:1} != 3 ]; then
        echo "ERROR: $resp_code at $link"
        exit_code=1
    fi
done

exit $exit_code
